"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import Link from "next/link"

import "swiper/css"
import "swiper/css/navigation"

const profiles = [
  {
    id: 1,
    name: "Raj Mujeeb",
    experties: "Web Development",
    city: "New Delhi",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/07/beautiful-1844944_960_720.jpg"},
  {
    id: 2,
    name: "Vaibhav",
    experties: "Mobile Development",
    city: "Mumbai",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/07/beautiful-1844944_960_720.jpg"  },
  {
    id: 3,
    name: "Ankita Pathak",
    experties: "UI/UX Design",
    city: "Bangalore",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/07/beautiful-1844944_960_720.jpg"},
  {
    id: 4,
    name: "Kuldeep Malla",
    experties: "Data Science",
    city: "Pune",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/07/beautiful-1844944_960_720.jpg"},
  {
    id: 5,
    name: "Parth Bhardwaj",
    experties: "Cloud Computing",
    city: "Hyderabad",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/07/beautiful-1844944_960_720.jpg"},
  {
    id: 6,
    name: "Tashu Garg",
    experties: "Digital Marketing",
    city: "Chennai",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/07/beautiful-1844944_960_720.jpg",
  },
]

export default function ProfilesSlider() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }
  const swiperParams = {
    modules: [Autoplay, Navigation],
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
    className: "mySwiper",
  };

  return (
    <section className="bg-[#591B0C] mt-12 py-12" id="transitions">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-10">Successful transitions</h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {profiles.map((profile) => (
            <SwiperSlide key={profile.id}>
              <Link href="#" className=" ">
              <div className="bg-white rounded-lg p-4 flex flex-col items-center h-auto hover:shadow-lg hover:bg-slate-100 transition-color duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={profile.imageUrl || "/placeholder.svg"}
                    alt={profile.name}
                    className="object-cover w-24 h-24 rounded-full"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{profile.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{profile.experties}</p>
                <p className="text-sm text-gray-600">{profile.city}</p>
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
