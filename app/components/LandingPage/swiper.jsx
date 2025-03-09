"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProfilesSlider() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles`);
      const data = await response.json();
      
      
      if (data.success) {
        setProfiles(data.profiles);
      } else {
        setError("Failed to fetch profiles");
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setError("Error fetching profiles");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-white">Loading profiles...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-light" id="transitions">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Successful Transitions</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Meet professionals who have successfully built their network and advanced their careers
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="mySwiper pb-14"
        >
          {profiles.map((profile) => (
            <SwiperSlide key={profile.username}>
              <Link href={`/${profile.username}`} className="block h-full">
                <div className="bg-white rounded-xl p-6 flex flex-col items-center h-full hover:shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-secondary/20">
                    <img
                      src={profile.imageUrl || "/placeholder.svg"}
                      alt={profile.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.name}</h3>
                  <p className="text-secondary font-medium mb-1">{profile.bio}</p>
                  <p className="text-gray-500">{profile.city}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        
      </div>
    </section>
  );
}
