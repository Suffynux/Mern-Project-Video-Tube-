import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Subscription } from "../models/subscription.model.js";


const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;
  // TODO: toggle subscription
  if (!channelId) {
    throw new ApiError(400, "Channel not found");
  }
  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  if (userId.toString() === channelId.toString()) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
  }

  const existedSubscriber = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });
  console.log(existedSubscriber);

  if (existedSubscriber) {
    await Subscription.findByIdAndDelete(existedSubscriber._id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Unsubscribed Successfully"));
  } else {
    const newSubscription = await Subscription.create({
      subscriber: userId,
      channel: channelId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, newSubscription, "Subscribed Successfully"));
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!channelId) {
    throw new ApiError(400, "Channel not found");
  }
  const subscribers = await Subscription.find({
    channel: channelId,
  }).select("subscriber");
  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "Subscribers fetched successfully"),
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  const channelToSubscribed = await Subscription.find({
    subscriber: subscriberId,
  }).select("channel");

  console.log(channelToSubscribed);
  console.log("working");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channelToSubscribed,
        "Channels fetched successfully",
      ),
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
