import React, { useRef } from "react";
import DonationsSlider from "../components/DonationsSlider";
import { motion, useInView } from "framer-motion";
import DonateSlider from "../components/DonateSlider";
import { Link } from "react-router";

export default function Home() {
  const sliderRef = useRef(null);
  const SecSliderRef = useRef(null);
  const bannerTwoRef = useRef(null);

  const isInView = useInView(sliderRef, { once: true });
  const SecIsInView = useInView(SecSliderRef, { once: true });
  const bTwoIsInView = useInView(bannerTwoRef, { once: false });

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[90vh] bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                معاً نصنع الفرق من خلال العطاء
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                انضم إلينا في مهمتنا لمساعدة المحتاجين وإحداث تأثير إيجابي في
                المجتمع
              </p>
              <div className="flex gap-4">
                <Link to={"/donate"}>
                  <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-3 rounded-lg font-medium transition-colors">
                    تبرع الآن
                  </button>
                </Link>
                <Link to={"/services"}>
                  <button className="border-2 border-[#6366f1] text-[#6366f1] px-8 py-3 rounded-lg font-medium hover:bg-[#6366f1] hover:text-white transition-colors">
                    اطلب تبرع
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* New Image Section */}
          <motion.div
            className="hidden lg:block w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <img
                  src="/donation.png"
                  alt="Donation Illustration"
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </motion.div>

              {/* Decorative background blur */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-indigo-100/30 blur-3xl"></div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Updated Slider Section */}
      <div
        ref={sliderRef}
        className="relative py-16 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            احدث الحملات للتبرعات
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <DonationsSlider />
        </motion.div>
      </div>

      <div
        ref={SecSliderRef}
        className="relative py-16 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={SecIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-800">احدث التبرعات</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={SecIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <DonateSlider />
        </motion.div>
      </div>
    </div>
  );
}
