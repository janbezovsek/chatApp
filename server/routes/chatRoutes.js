const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

//API endpoint for accessing chat (one on one chat)
router.route("/").post(protect, accessChat)

//API endpoint for fetching chats
router.route("/").get(protect, fetchChats)

//API endpoint for creating group chat
router.route("/group").post(protect, createGroupChat)

//API endpoint for renaming group
router.route("/rename").put(protect, renameGroup)

//API endpoint for removing user from group chat
router.route("/groupRemove").put(protect, removeFromGroup)

//API endpoint for adding to group chat
router.route("/groupAdd").put(protect, addToGroup)



module.exports = router