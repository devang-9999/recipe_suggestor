import { createSlice } from "@reduxjs/toolkit";

const savedUsers = JSON.parse(localStorage.getItem("registeredUsers"));
const savedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));


const registerSlice = createSlice({
  name: "registerUsers",
initialState: {
  registeredUsers:[],
  currentUser:  null
}
,

  reducers: {
registerUser: (state, action) => {
  const newUser = {
    id: Date.now(),
    ...action.payload,
    isBlocked: false,
    orders: [],
    address: "",
    phone: ""
  };

  state.registeredUsers.push(newUser);

  localStorage.setItem(
    "registeredUsers",
    JSON.stringify(state.registeredUsers)
  );
},

toggleBlockUser: (state, action) => {
  const user = state.registeredUsers.find(u => u.id === action.payload);

  if (user && user.role !== "admin") {
    user.isBlocked = !user.isBlocked;
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(state.registeredUsers)
    );
  }
}
,

addOrderToUser: (state, action) => {
  const { userId, order } = action.payload;
  const user = state.registeredUsers.find(u => u.id === userId);

  if (user) {
    user.orders.push(order);
    if (state.currentUser && state.currentUser.id === userId) {
      state.currentUser.orders.push(order);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(state.currentUser)
      );
    }

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(state.registeredUsers)
    );
  }
},



updateUserAddress: (state, action) => {
  const { userId, address, phone } = action.payload;
  const user = state.registeredUsers.find(u => u.id === userId);

  if (user) {
    user.address = address;
    user.phone = phone;
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(state.registeredUsers)
    );
  }
}
,
loginUser: (state, action) => {
  const { email, password } = action.payload;

  const user = state.registeredUsers.find(
    u => u.email === email && u.password === password
  );

  if (user && !user.isBlocked) {
    state.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
}

,

logoutUser: (state) => {
  state.currentUser = null;
  localStorage.removeItem("currentUser");
}


  }
});

export const {
  registerUser,
  toggleBlockUser,
  addOrderToUser,
  updateUserAddress,
  loginUser,
  logoutUser
} = registerSlice.actions


export default registerSlice.reducer;
