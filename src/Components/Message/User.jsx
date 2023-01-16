import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { UserCircleIcon } from "@heroicons/react/solid";

function User(props) {
  return (
    <div
      className={
        props.isSelected
          ? "flex items-center bg-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-300 focus:outline-none"
          : "flex items-center px-3 py-2 text-sm transition duration-150  ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-300 focus:outline-none"
      }
    >
      <img
        className="object-cover w-10 h-10 rounded-full"
        src="https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png"
        alt="username"
      />
      <div className="w-full pb-2">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">
            {props.name}
          </span>
          {/* <span className="block ml-2 text-sm text-gray-600">6 hour</span> */}
        </div>
        <span
          className={
            props.lastSeen
              ? "block ml-2 text-sm text-gray-600"
              : "block ml-2 text-sm text-gray-600 font-bold"
          }
        >
          {props.lastMessage}
        </span>
      </div>
    </div>
  );
}

export default User;
