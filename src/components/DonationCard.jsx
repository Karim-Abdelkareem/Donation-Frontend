import React from "react";
import { Link } from "react-router";

export default function DonationCard({ campaign }) {
  const donationPrecent = Math.round(
    (campaign.currentAmount / campaign.goalAmount) * 100
  );
  return (
    <>
      <div className="flex flex-col space-y-3  p-4 bg-white border border-gray-300 shadow-md hover:shadow-lg rounded-xl">
        <div className="relative">
          <img
            loading="lazy"
            className="rounded-md mt-4"
            src={campaign.proofImages[0]}
          />
          <div className="absolute -bottom-1 right-0 w-full h-5 text-xs rounded-b-md overflow-hidden">
            <div className="absolute h-full w-full bg-white opacity-50 text-center z-[1]" />
            <div
              className={`absolute h-full flex justify-end overflow-hidden text-white items-center font-bold bg-[#009174] z-[2]`}
              style={{ width: `${donationPrecent}%` }}
            >
              {donationPrecent}%
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md bg-gray-200 text-xs text-black w-fit px-2 py-1">
          <p>المشاريع العامة</p>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-extrabold">{campaign.title}</p>
          <p className="text-sm font-medium text-gray-500">
            {campaign.donationCode}
          </p>
        </div>
        <div className="flex bg-gray-50 rounded-md p-4 gap-x-20 items-center">
          <div className="flex flex-col space-y-2">
            <p className="text-[#009174] font-semibold">تم جمع</p>
            <p className="text-sm font-medium">
              {campaign.currentAmount} <span>ج.م</span>
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-[#009174] font-semibold">المبلغ المتبقي</p>
            <p className="text-sm font-medium">
              {campaign.goalAmount} <span>ج.م</span>
            </p>
          </div>
        </div>
        <hr className="text-gray-300" />
        <Link to={`/projects/${campaign._id}`} className="text-center">
          <p className="font-medium text-gray-400">عرض التفاصيل</p>
        </Link>
      </div>
    </>
  );
}
