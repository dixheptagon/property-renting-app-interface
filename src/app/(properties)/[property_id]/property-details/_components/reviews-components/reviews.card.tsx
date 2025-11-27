"use client";

import { Star, Building2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "../../_utils/format.date";
import React from "react";
import { truncateComment, truncateReply } from "../../_utils/truncate.data";

export default function ReviewCard({ reviewData }: { reviewData: any }) {
  const [showFullReply, setShowFullReply] = React.useState(false);
  const [showFullComment, setShowFullComment] = React.useState(false);

  return (
    <Card className="mt-4 w-full overflow-hidden">
      <CardHeader>
        <div className="flex justify-between">
          {/* User Info */}
          <div className="flex items-start justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-800 text-sm font-semibold text-white">
                {reviewData.username.charAt(0)}
              </div>
              <div>
                <div className="text-md">{reviewData.username}</div>
                <div className="text-xs">{reviewData.roomTypeName}</div>
              </div>
            </CardTitle>
          </div>

          {/* Rating Stars */}
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < reviewData.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-700">
                {reviewData.rating}.0
              </span>
            </div>

            {/* Created At */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                Reviewed on {formatDate(new Date(reviewData.createdAt))}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Review Text */}
        <div className="space-y-2">
          <p className="leading-relaxed whitespace-pre-line text-gray-700">
            {showFullComment
              ? reviewData.reviewComment
              : truncateComment(reviewData.reviewComment)}
          </p>
          {reviewData.reviewComment.length > 100 && (
            <button
              onClick={() => setShowFullComment(!showFullComment)}
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              {showFullComment ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Tenant Reply Accordion */}
        {reviewData.tenantReply && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reply" className="border-none">
              <AccordionTrigger className="rounded-lg bg-blue-50 px-4 py-3 hover:bg-blue-100 hover:no-underline">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-800 text-sm font-semibold text-white">
                    {reviewData.tenantName.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-900">
                    Reply from tenant
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-3 pb-4">
                <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {reviewData.tenantName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(new Date(reviewData.updatedAt))}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed tracking-wide whitespace-pre-line text-gray-700">
                    {showFullReply
                      ? reviewData.tenantReply
                      : truncateReply(reviewData.tenantReply)}
                  </p>
                  {reviewData.tenantReply.length > 100 && (
                    <button
                      onClick={() => setShowFullReply(!showFullReply)}
                      className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                    >
                      {showFullReply ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
