"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail as Email } from "lucide-react"

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row md:space-x-4">
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        <Image
          src={profile.profileImage || "/placeholder.svg"}
          alt={profile.fullName}
          fill
          sizes="128px" 
          className=" object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{profile.fullName}</h3>
          <p className="text-sm text-gray-500 mt-1">{profile.gender}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 line-clamp-2">{profile.bio}</p>
        </div>
        <div className="mt-4 flex flex-col space-y-2">
          {profile.email && (
            <div className="flex items-center">
              <Email className="w-4 h-4 mr-1" />
              <span className="text-sm text-gray-500">{profile.email}</span>
            </div>
          )}
          {profile.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              <span className="text-sm text-gray-500">{profile.phone}</span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Link
            href={`/dashboard/profiles/${profile._id}`}
            className="text-primary hover:text-primary-dark font-medium text-sm"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  )
}
