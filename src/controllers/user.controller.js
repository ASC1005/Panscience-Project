import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean();
    return res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password").lean();
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id }).select("-password").lean();
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
});


export const createUser = asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "Email is already in use");
    }

    const newUser = await User.create({ email, password, fullName });
    return res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});

export const loginUser = asyncHandler(async (req, res) =>{

    const {email, password} = req.body

    if (!email) {
        throw new ApiError(400, " is required")
    }

    const user = await User.findOne({
        email: email
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

export const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { 
        new: true, 
        runValidators: true 
    }).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});
