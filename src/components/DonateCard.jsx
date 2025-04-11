import React from "react";
import { Link } from "react-router";

export default function DonateCard({ campaign }) {
  const statusColor =
    campaign.status === "active"
      ? "bg-indigo-100 text-indigo-800"
      : "bg-gray-100 text-gray-800";

  return (
    <div className="flex flex-col space-y-3 p-4 bg-white border border-gray-300 shadow-md hover:shadow-lg rounded-xl">
      <div className="relative">
        <img
          loading="lazy"
          className="rounded-md mt-4 h-48 w-full object-cover"
          src={campaign.proofImages[0]}
          alt={campaign.title}
        />
        <div className="absolute top-2 left-2">
          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}
          >
            تبرع
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-md bg-gray-200 text-xs text-black w-fit px-2 py-1">
        <p>{campaign.donateCode}</p>
      </div>

      <div className="space-y-2">
        <p className="text-lg font-extrabold">{campaign.title}</p>
      </div>

      <div className="bg-indigo-50 rounded-md p-4">
        <div className="flex items-center">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-elipses line-clamp-3">
              {campaign.description}
            </p>
          </div>
        </div>
      </div>

      <hr className="text-gray-300" />

      <Link to={`/donate/${campaign._id}`} className="text-center">
        <p className="font-medium text-indigo-400 hover:text-indigo-600 transition-colors">
          عرض التفاصيل
        </p>
      </Link>
    </div>
  );
}
