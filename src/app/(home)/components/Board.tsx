import React from "react";
import { searchUsers } from "@/app/(home)/data/api";
import Dropdown from "./Dropdown";

export default function Board({
  search,
  setSearch,
  token,
  searchRef,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  token?: string;
  searchRef?: React.LegacyRef<HTMLInputElement>;
}) {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  return (
    <div className="w-full max-w-[480px]">
      <div className="bg-white w-full h-[80vh] p-6 overflow-auto">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const res = await searchUsers(search, token);
            if (res.status === 200) {
              setUsers(res.data.items);
            }
            setLoading(false);
          }}
        >
          <input
            ref={searchRef}
            type="text"
            className="w-full h-10 border border-gray-300 bg-gray-200 pl-3 text-sm"
            placeholder='Enter username or press "CMD/CTRL + F"'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="mt-4 w-full h-10 bg-blue-500 text-white text-sm font-semibold tracking-wide disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </form>
        {users.length > 0 ? (
          <p className="mt-2 text-gray-500">
            Showing users for &quot;{search}&quot;
          </p>
        ) : (
          <p className="mt-2 text-gray-500">Your search does not match.</p>
        )}
        <div className="mt-4">
          {users.map((user, idx) => (
            <React.Fragment key={idx}>
              <Dropdown user={user} token={token} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
