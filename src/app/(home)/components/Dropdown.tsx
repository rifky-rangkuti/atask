import React from "react";
import { IUserSearch } from "../data/type";
import Image from "next/image";
import ArrowDownSvg from "@/assets/arrow-down.svg";
import StarPng from "@/assets/star.png";
import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../data/api";
import clsx from "clsx";

export default function Dropdown({
  user,
  token,
}: {
  user: IUserSearch;
  token?: string;
}) {
  const [isOpen, setOpen] = React.useState(false);
  const { data: repos, isLoading } = useQuery({
    queryKey: ["repos", user.login],
    queryFn: () => getUserRepos(user.login, token),
    enabled: isOpen,
  });
  return (
    <div>
      <div
        onClick={() => {
          setOpen((n) => !n);
        }}
        className={clsx(
          "w-full h-10 bg-gray-200 flex items-center justify-between px-4 cursor-pointer",
          isOpen ? "mb-2" : "mb-4"
        )}
      >
        <p>{user.login}</p>
        <Image
          src={ArrowDownSvg}
          alt=""
          className={clsx(isOpen ? "rotate-180" : "rotate-0")}
        />
      </div>
      {isOpen && (
        <div className="pl-4">
          {isLoading ? (
            <p className="mb-4">Loading...</p>
          ) : repos?.data?.length === 0 ? (
            <p className="mb-4">Empty repos...</p>
          ) : (
            repos?.data?.map((repo) => (
              <div
                className="w-full min-h-[75px] bg-gray-300 mb-4 p-4 flex items-start justify-between"
                key={repo.id}
              >
                <div className="flex-1">
                  <p className="text-base font-semibold">{repo.name}</p>
                  <p className="text-sm font-medium text-gray-600">
                    {repo.description}
                  </p>
                </div>
                <div className="flex items-center w-10 justify-end">
                  <Image
                    src={StarPng}
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <p className="text-sm font-medium ml-1">
                    {repo.stargazers_count}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
