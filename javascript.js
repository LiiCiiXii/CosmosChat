// Global variables
let currentUser = null
let friends = []
let currentChat = null
let messages = {}
let isInCall = false
let callTimer = null
let callStartTime = null
let localStream = null
const remoteStream = null

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  createStars()
  checkAuthStatus()
  setupEventListeners()
})

// Create animated stars
function createStars() {
  const starsContainer = document.getElementById("stars-container")
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.width = Math.random() * 3 + "px"
    star.style.height = star.style.width
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.animationDelay = Math.random() * 3 + "s"
    starsContainer.appendChild(star)
  }
}

// Setup event listeners
function setupEventListeners() {
  // Login form
  document.getElementById("login-form").addEventListener("submit", handleLogin)

  // Signup form
  document.getElementById("signup-form").addEventListener("submit", handleSignup)

  // Profile form
  document.getElementById("profile-form").addEventListener("submit", handleProfileUpdate)

  // Add friend form
  document.getElementById("add-friend-form").addEventListener("submit", handleAddFriend)

  // Message input
  document.getElementById("message-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })
}

// Check authentication status
function checkAuthStatus() {
  const userData = localStorage.getItem("cosmosUser")
  if (userData) {
    currentUser = JSON.parse(userData)
    loadUserData()
    showDashboard()
  } else {
    showLanding()
  }
}

// Navigation functions
function showLanding() {
  hideAllPages()
  document.getElementById("landing-page").classList.remove("hidden")
}

function showLogin() {
  hideAllPages()
  document.getElementById("login-page").classList.remove("hidden")
}

function showSignup() {
  hideAllPages()
  document.getElementById("signup-page").classList.remove("hidden")
}

function showDashboard() {
  hideAllPages()
  document.getElementById("dashboard").classList.remove("hidden")
  updateDashboard()
}

function showChat(friendId) {
  hideAllPages()
  document.getElementById("chat-interface").classList.remove("hidden")
  loadChat(friendId)
}

function hideAllPages() {
  const pages = ["landing-page", "login-page", "signup-page", "dashboard", "chat-interface"]
  pages.forEach((page) => {
    document.getElementById(page).classList.add("hidden")
  })
}

// Authentication functions
function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Simulate login (in real app, this would be an API call)
  const userData = {
    id: generateUserId(),
    username: email.split("@")[0],
    email: email,
    bio: "Exploring the cosmos...",
    avatar: null,
    joinDate: new Date().toISOString(),
  }

  currentUser = userData
  localStorage.setItem("cosmosUser", JSON.stringify(userData))
  loadUserData()
  showDashboard()
}

function handleSignup(e) {
  e.preventDefault()
  const username = document.getElementById("signup-username").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value

  // Simulate signup (in real app, this would be an API call)
  const userData = {
    id: generateUserId(),
    username: username,
    email: email,
    bio: "New cosmic explorer!",
    avatar: null,
    joinDate: new Date().toISOString(),
  }

  currentUser = userData
  localStorage.setItem("cosmosUser", JSON.stringify(userData))
  loadUserData()
  showDashboard()
}

function logout() {
  localStorage.removeItem("cosmosUser")
  localStorage.removeItem("cosmosFriends")
  localStorage.removeItem("cosmosMessages")
  currentUser = null
  friends = []
  messages = {}
  showLanding()
}

// User data functions
function loadUserData() {
  if (!currentUser) return

  // Load friends
  const savedFriends = localStorage.getItem("cosmosFriends")
  if (savedFriends) {
    friends = JSON.parse(savedFriends)
  }

  // Load messages
  const savedMessages = localStorage.getItem("cosmosMessages")
  if (savedMessages) {
    messages = JSON.parse(savedMessages)
  }
}

function saveUserData() {
  localStorage.setItem("cosmosUser", JSON.stringify(currentUser))
  localStorage.setItem("cosmosFriends", JSON.stringify(friends))
  localStorage.setItem("cosmosMessages", JSON.stringify(messages))
}

function generateUserId() {
  return "cosmic_" + Math.random().toString(36).substr(2, 9)
}

// Dashboard functions
function updateDashboard() {
  if (!currentUser) return

  // Update welcome text
  document.getElementById("welcome-text").textContent = `Welcome back, ${currentUser.username}!`

  // Update avatar
  const avatar = document.getElementById("user-avatar")
  if (currentUser.avatar) {
    avatar.style.backgroundImage = `url(${currentUser.avatar})`
    avatar.style.backgroundSize = "cover"
    avatar.textContent = ""
  } else {
    avatar.textContent = currentUser.username.charAt(0).toUpperCase()
  }

  // Update stats
  document.getElementById("friends-count").textContent = friends.length
  document.getElementById("active-chats-count").textContent = Object.keys(messages).length

  // Update friends list
  updateFriendsList()
}

function updateFriendsList() {
  const friendsList = document.getElementById("friends-list")

  if (friends.length === 0) {
    friendsList.innerHTML = `
            <div class="text-center text-gray-400 py-8">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
                <p>No cosmic friends yet. Start exploring the universe!</p>
            </div>
        `
    return
  }

  friendsList.innerHTML = friends
    .map((friend) => {
      const lastMessage = messages[friend.id] ? messages[friend.id][messages[friend.id].length - 1] : null
      const unreadCount = getUnreadCount(friend.id)

      return `
            <div onclick="showChat('${friend.id}')" class="flex items-center justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-200 cursor-pointer group mb-3">
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            ${friend.avatar ? `<img src="${friend.avatar}" class="w-full h-full rounded-full object-cover">` : friend.username.charAt(0).toUpperCase()}
                        </div>
                        <div class="absolute -bottom-1 -right-1 w-3 h-3 border-2 border-black rounded-full ${friend.status === "online" ? "bg-green-400" : "bg-gray-500"}"></div>
                    </div>
                    <div>
                        <p class="font-semibold text-white group-hover:text-cyan-300 transition-colors">${friend.username}</p>
                        ${lastMessage ? `<p class="text-sm text-gray-400 truncate max-w-xs">${lastMessage.type === "text" ? lastMessage.text : "📷 Image"}</p>` : '<p class="text-sm text-gray-400">No messages yet</p>'}
                    </div>
                </div>
                
                <div class="flex items-center space-x-2">
                    <span class="text-xs px-2 py-1 rounded-full ${friend.status === "online" ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"}">${friend.status}</span>
                    ${unreadCount > 0 ? `<span class="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">${unreadCount}</span>` : ""}
                    <svg class="w-4 h-4 text-purple-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                </div>
            </div>
        `
    })
    .join("")
}

function getUnreadCount(friendId) {
  if (!messages[friendId]) return 0
  return messages[friendId].filter((msg) => !msg.read && msg.sender === "friend").length
}

// Profile functions
function showProfile() {
  document.getElementById("profile-modal").classList.remove("hidden")

  // Populate profile form
  document.getElementById("profile-username").value = currentUser.username
  document.getElementById("profile-bio").value = currentUser.bio || ""
  document.getElementById("profile-id").value = currentUser.id

  // Update profile avatar
  const profileAvatar = document.getElementById("profile-avatar")
  if (currentUser.avatar) {
    profileAvatar.style.backgroundImage = `url(${currentUser.avatar})`
    profileAvatar.style.backgroundSize = "cover"
    profileAvatar.textContent = ""
  } else {
    profileAvatar.textContent = currentUser.username.charAt(0).toUpperCase()
  }
}

function hideProfile() {
  document.getElementById("profile-modal").classList.add("hidden")
}

function handleProfileUpdate(e) {
  e.preventDefault()

  currentUser.username = document.getElementById("profile-username").value
  currentUser.bio = document.getElementById("profile-bio").value

  saveUserData()
  updateDashboard()
  hideProfile()

  showNotification("Profile updated successfully!", "success")
}

function updateAvatar(input) {
  const file = input.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      currentUser.avatar = e.target.result

      // Update all avatar displays
      const avatars = [document.getElementById("user-avatar"), document.getElementById("profile-avatar")]
      avatars.forEach((avatar) => {
        avatar.style.backgroundImage = `url(${currentUser.avatar})`
        avatar.style.backgroundSize = "cover"
        avatar.textContent = ""
      })

      saveUserData()
    }
    reader.readAsDataURL(file)
  }
}

function copyUserId() {
  const userId = document.getElementById("profile-id")
  userId.select()
  document.execCommand("copy")
  showNotification("Cosmic ID copied to clipboard!", "success")
}

// Friend functions
function showAddFriend() {
  document.getElementById("add-friend-modal").classList.remove("hidden")
}

function hideAddFriend() {
  document.getElementById("add-friend-modal").classList.add("hidden")
  document.getElementById("friend-identifier").value = ""
}

function handleAddFriend(e) {
  e.preventDefault()

  const identifier = document.getElementById("friend-identifier").value.trim()

  // Check if friend already exists
  const existingFriend = friends.find((f) => f.id === identifier || f.username === identifier)
  if (existingFriend) {
    showNotification("This cosmic explorer is already your friend!", "warning")
    return
  }

  // Check if trying to add self
  if (identifier === currentUser.id || identifier === currentUser.username) {
    showNotification("You cannot add yourself as a friend!", "warning")
    return
  }

  // Simulate finding friend (in real app, this would be an API call)
  const newFriend = {
    id: identifier.startsWith("cosmic_") ? identifier : generateUserId(),
    username: identifier.startsWith("cosmic_") ? `User_${identifier.slice(-4)}` : identifier,
    status: Math.random() > 0.5 ? "online" : "offline",
    avatar: null,
    addedDate: new Date().toISOString(),
  }

  friends.push(newFriend)
  saveUserData()
  updateDashboard()
  hideAddFriend()

  showNotification(`${newFriend.username} added to your cosmic friends!`, "success")
}

// Chat functions
function loadChat(friendId) {
  const friend = friends.find((f) => f.id === friendId)
  if (!friend) return

  currentChat = friend

  // Update chat header
  document.getElementById("chat-friend-name").textContent = friend.username
  document.getElementById("chat-friend-status-text").textContent = friend.status
  document.getElementById("chat-friend-status-text").className =
    `text-xs px-2 py-1 rounded-full ${friend.status === "online" ? "text-green-300 bg-green-500/20 border border-green-500/30" : "text-gray-400 bg-gray-500/20 border border-gray-500/30"}`

  const chatAvatar = document.getElementById("chat-friend-avatar")
  if (friend.avatar) {
    chatAvatar.style.backgroundImage = `url(${friend.avatar})`
    chatAvatar.style.backgroundSize = "cover"
    chatAvatar.textContent = ""
  } else {
    chatAvatar.textContent = friend.username.charAt(0).toUpperCase()
  }

  // Load messages
  loadMessages(friendId)

  // Mark messages as read
  if (messages[friendId]) {
    messages[friendId].forEach((msg) => {
      if (msg.sender === "friend") {
        msg.read = true
      }
    })
    saveUserData()
  }
}

function loadMessages(friendId) {
  const container = document.getElementById("messages-container")
  const friendMessages = messages[friendId] || []

  container.innerHTML = friendMessages
    .map((message) => {
      const isUser = message.sender === "user"
      const time = new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      if (message.type === "image") {
        return `
                <div class="flex ${isUser ? "justify-end" : "justify-start"}">
                    <div class="max-w-xs lg:max-w-md">
                        <div class="p-2 rounded-lg ${isUser ? "bg-gradient-to-r from-cyan-500 to-purple-500" : "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 backdrop-blur-sm"} message-bubble">
                            <img src="${message.image}" alt="Shared image" class="rounded-lg max-w-full h-auto">
                        </div>
                        <p class="text-xs text-gray-400 mt-1 ${isUser ? "text-right" : "text-left"}">${time}</p>
                    </div>
                </div>
            `
      } else {
        return `
                <div class="flex ${isUser ? "justify-end" : "justify-start"}">
                    <div class="max-w-xs lg:max-w-md">
                        <div class="p-3 rounded-lg ${isUser ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white" : "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 text-white backdrop-blur-sm"} message-bubble">
                            <p class="text-sm">${message.text}</p>
                        </div>
                        <p class="text-xs text-gray-400 mt-1 ${isUser ? "text-right" : "text-left"}">${time}</p>
                    </div>
                </div>
            `
      }
    })
    .join("")

  // Scroll to bottom
  container.scrollTop = container.scrollHeight
}

function sendMessage() {
  const input = document.getElementById("message-input")
  const text = input.value.trim()

  if (!text || !currentChat) return

  const message = {
    id: Date.now().toString(),
    text: text,
    sender: "user",
    timestamp: new Date().toISOString(),
    type: "text",
    read: true,
  }

  // Add message to messages
  if (!messages[currentChat.id]) {
    messages[currentChat.id] = []
  }
  messages[currentChat.id].push(message)

  // Clear input
  input.value = ""

  // Update UI
  loadMessages(currentChat.id)
  saveUserData()

  // Simulate friend response
  simulateFriendResponse()
}

function sendImage(input) {
  const file = input.files[0]
  if (!file || !currentChat) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const message = {
      id: Date.now().toString(),
      image: e.target.result,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: "image",
      read: true,
    }

    if (!messages[currentChat.id]) {
      messages[currentChat.id] = []
    }
    messages[currentChat.id].push(message)

    loadMessages(currentChat.id)
    saveUserData()

    // Simulate friend response
    setTimeout(() => {
      simulateFriendResponse("Nice photo! 📸✨")
    }, 1500)
  }
  reader.readAsDataURL(file)

  // Clear input
  input.value = ""
}

function simulateFriendResponse(customText = null) {
  if (!currentChat) return

  // Show typing indicator
  document.getElementById("typing-indicator").classList.remove("hidden")

  setTimeout(() => {
    document.getElementById("typing-indicator").classList.add("hidden")

    const responses = [
      "That's awesome! 🌟",
      "I totally agree with you!",
      "Haha, you're so funny! 😄",
      "Tell me more about that!",
      "That sounds amazing! ✨",
      "I love exploring the cosmos with you! 🚀",
      "Wow, that's incredible!",
      "Thanks for sharing that! 💫",
      "You always have the best ideas! 🌌",
    ]

    const responseText = customText || responses[Math.floor(Math.random() * responses.length)]

    const friendMessage = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: "friend",
      timestamp: new Date().toISOString(),
      type: "text",
      read: false,
    }

    messages[currentChat.id].push(friendMessage)
    loadMessages(currentChat.id)
    saveUserData()
  }, 2000)
}

function backToDashboard() {
  currentChat = null
  showDashboard()
}

// Call functions
function startVoiceCall() {
  if (!currentChat) return
  showNotification(`Starting voice call with ${currentChat.username}...`, "info")
  // In a real app, this would initiate WebRTC voice call
}

function startVideoCall() {
  if (!currentChat) return

  document.getElementById("video-call-overlay").classList.remove("hidden")
  document.getElementById("remote-video-label").textContent = currentChat.username

  isInCall = true
  callStartTime = Date.now()
  startCallTimer()

  // Simulate getting user media
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      localStream = stream
      document.getElementById("local-video").srcObject = stream
    })
    .catch((err) => {
      console.error("Error accessing media devices:", err)
      showNotification("Could not access camera/microphone", "error")
    })

  showNotification(`Video call started with ${currentChat.username}`, "success")
}

function endCall() {
  isInCall = false

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop())
    localStream = null
  }

  if (callTimer) {
    clearInterval(callTimer)
    callTimer = null
  }

  document.getElementById("video-call-overlay").classList.add("hidden")
  document.getElementById("call-timer").textContent = "00:00"

  showNotification("Call ended", "info")
}

function startCallTimer() {
  callTimer = setInterval(() => {
    if (!isInCall) return

    const elapsed = Math.floor((Date.now() - callStartTime) / 1000)
    const minutes = Math.floor(elapsed / 60)
      .toString()
      .padStart(2, "0")
    const seconds = (elapsed % 60).toString().padStart(2, "0")

    document.getElementById("call-timer").textContent = `${minutes}:${seconds}`
  }, 1000)
}

function toggleMute() {
  if (!localStream) return

  const audioTrack = localStream.getAudioTracks()[0]
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled
    const muteBtn = document.getElementById("mute-btn")

    if (audioTrack.enabled) {
      muteBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                </svg>
            `
      muteBtn.className = "bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full transition-colors"
    } else {
      muteBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                </svg>
            `
      muteBtn.className = "bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
    }
  }
}

function toggleVideo() {
  if (!localStream) return

  const videoTrack = localStream.getVideoTracks()[0]
  if (videoTrack) {
    videoTrack.enabled = !videoTrack.enabled
    const videoBtn = document.getElementById("video-btn")

    if (videoTrack.enabled) {
      videoBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
            `
      videoBtn.className = "bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full transition-colors"
    } else {
      videoBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                </svg>
            `
      videoBtn.className = "bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
    }
  }
}

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`

  const colors = {
    success: "bg-green-500/90 text-white border border-green-400",
    error: "bg-red-500/90 text-white border border-red-400",
    warning: "bg-yellow-500/90 text-black border border-yellow-400",
    info: "bg-blue-500/90 text-white border border-blue-400",
  }

  notification.className += ` ${colors[type]}`
  notification.textContent = message

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full")
  }, 100)

  // Animate out and remove
  setTimeout(() => {
    notification.classList.add("translate-x-full")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Initialize WebRTC for real-time communication (basic setup)
function initializeWebRTC() {
  // This would be expanded for real WebRTC implementation
  // For now, it's just a placeholder for the structure
  console.log("WebRTC initialized for real-time communication")
}

// Call initialization
initializeWebRTC()
