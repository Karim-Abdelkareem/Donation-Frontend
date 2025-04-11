import React from "react";
import { Link } from "react-router";

export default function DonationCard({ campaign }) {
  const donationPercent = Math.round(
    (campaign.currentAmount / campaign.goalAmount) * 100
  );

  return (
    <div className="flex flex-col space-y-3 p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-lg transition-shadow duration-200">
      <div className="relative">
        <img
          loading="lazy"
          className="rounded-lg h-48 w-full object-cover"
          src={campaign.proofImages[0]}
          alt={campaign.title}
        />
        <div className="absolute -top-3 left-2">
          <div className="bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full w-fit px-3 py-1">
            <p>{campaign.category || "المشاريع العامة"}</p>
          </div>
        </div>
        {/* Progress overlay */}
        <div className="absolute bottom-0 right-0 w-full h-6 bg-black bg-opacity-30 rounded-b-lg">
          <div className="relative h-full w-full">
            <div
              className="absolute h-full bg-indigo-600 rounded-b-lg transition-all duration-300"
              style={{ width: `${donationPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
              {donationPercent}%
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
          {campaign.title}
        </h3>
        <p className="text-sm text-gray-500">{campaign.donationCode}</p>
      </div>

      <div className="flex justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col space-y-1">
          <p className="text-indigo-600 text-sm font-semibold">تم جمع</p>
          <p className="text-sm font-medium text-gray-900">
            {campaign.currentAmount} <span className="text-gray-600">ج.م</span>
          </p>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-indigo-600 text-sm font-semibold">
            المبلغ المستهدف
          </p>
          <p className="text-sm font-medium text-gray-900">
            {campaign.goalAmount} <span className="text-gray-600">ج.م</span>
          </p>
        </div>
      </div>

      <hr className="border-gray-100" />

      <Link
        to={`/projects/${campaign._id}`}
        className="text-center py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
      >
        عرض التفاصيل
      </Link>
    </div>
  );
}
