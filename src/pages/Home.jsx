import React, { useRef } from "react";
import Carousel from "../components/Carousel";
import DonationsSlider from "../components/DonationsSlider";
import { motion, useInView } from "framer-motion";

export default function Home() {
  const sliderRef = useRef(null);
  const bannerRef = useRef(null);
  const bannerTwoRef = useRef(null);
  const aya = useRef(null);
  const ehasn = useRef(null);
  const createAccountRef = useRef(null);

  const isInView = useInView(sliderRef, { once: false });
  const bIsInView = useInView(bannerRef, { once: false });
  const bTwoIsInView = useInView(bannerTwoRef, { once: false });
  const ayaInView = useInView(aya, { once: false });
  const ehasnInView = useInView(ehasn, { once: false });
  const createAccountInView = useInView(createAccountRef, { once: false });

  return (
    <div className="overflow-hidden">
      <Carousel />
      <div className="flex justify-center my-32 items-center">
        <img
          src="https://ehsan.sa/ehsan-ui/images/snapel/left-snapel.svg"
          className="w-sm-52px w-75px ms-2 ms-md-0"
          alt="سنابل إحسان"
        />
        <img
          src="https://ehsan.sa/ehsan-ui/images/ahseno-ayah.svg"
          className="brightness-0 invert-[30%] sepia-[90%] saturate-[2000%] hue-rotate-[200deg] contrast-[100%]"
          alt="وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ"
        />

        <img
          src="https://ehsan.sa/ehsan-ui/images/snapel/right-snapel.svg"
          className="w-sm-52px w-75px ms-2 ms-md-0"
          alt="سنابل إحسان"
        />
      </div>
      <div ref={sliderRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        >
          <DonationsSlider />
        </motion.div>
      </div>
      <div ref={bannerRef} className="relative my-64 py-28 w-full bg-[#f2f9f8]">
        <motion.div
          className="absolute z-[2] bottom-0 left-0 w-72"
          initial={{ opacity: 0, x: -50 }}
          animate={bIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        >
          <img src="https://ehsan.sa/ehsan-ui/images/waqf-home-bg.png" alt="" />
        </motion.div>
        <motion.div
          className="absolute right-0 top-16 space-y-3 mr-10"
          initial={{ opacity: 0, x: 50 }}
          animate={bIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
        >
          <div>
            <p className="text-[#009174] text-4xl font-bold">وقف إحسان</p>
            <p className="text-3xl font-bold">
              صدقة جارية يدوم نفعها ويتضاعف أجرها.
            </p>
          </div>
        </motion.div>
      </div>
      {/* New Section */}
      <div ref={bannerTwoRef} className="bg-[#f8f9fa] mt-64 py-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={bTwoIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        >
          <div className="flex items-center justify-center pt-4 pb-2">
            <img
              className="w-6"
              src="https://ehsan.sa/ehsan-ui/images/snapel/one-small-green.svg"
              alt=""
            />
            <h1 className="text-[#003f6a] text-2xl font-bold">
              من أثر إحسانكم
            </h1>
          </div>
          <p className="text-gray-400 text-center">
            أثر يغير الحياة، وسعادة تنمو لعطاء مستمر
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={bTwoIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        >
          <div className="flex flex-col items-start mx-auto w-1/3 py-10">
            <img
              className="opacity-70"
              src="	https://ehsan.sa/ehsan-ui/images/icons/collun-icon.svg"
              alt=""
            />
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold">
                نحن نعمل معكم لتحسين حياتكم
              </h1>
              <p className="text-[#003f6a] font-medium">
                مستفيد من مشروع توفير التبرعات
              </p>
            </div>
            <div className="flex items-center gap-4 pt-10 mx-auto">
              <div className="bg-[#f6fef9] text-[#009174] border border-[#009174] rounded-md px-3 py-1 text-sm">
                121,250+مستفيد
              </div>
              <div className="bg-[#f6fef9] text-[#009174] border border-[#009174] rounded-md px-3 py-1 text-sm">
                54,587,555 ج.م
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        ref={aya}
        initial={{ opacity: 0, y: 50 }}
        animate={ayaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        className="flex justify-center my-20 items-center"
      >
        <img
          src="https://ehsan.sa/ehsan-ui/images/snapel/left-snapel.svg"
          className="w-sm-52px w-75px ms-2 ms-md-0"
          alt="سنابل إحسان"
        />
        <img
          src="https://ehsan.sa/ehsan-ui/images/aya.svg"
          alt="وأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ"
        />

        <img
          src="https://ehsan.sa/ehsan-ui/images/snapel/right-snapel.svg"
          className="w-sm-52px w-75px ms-2 ms-md-0"
          alt="سنابل إحسان"
        />
      </motion.div>

      {/*  */}

      <div className="relative flex justify-center items-center my-40 bg-[url(https://ehsan.sa/ehsan-ui/images/home/bg-statistics.svg)] bg-[#00493a] bg-cover bg-no-repeat bg-center">
        <div className="absolute left-0 flex">
          <img
            src="https://ehsan.sa/ehsan-ui/images/snapil-vertical-bg.svg"
            alt=""
          />
          <img
            src="https://ehsan.sa/ehsan-ui/images/snapil-vertical-bg.svg"
            alt=""
          />
        </div>
        <div
          ref={ehasn}
          className="py-14 flex flex-col items-center justify-center space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={ehasnInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          >
            <h1 className="text-white text-4xl font-bold">
              إحسانكم لعام
              <span className="p-2 bg-[#fff3] mr-2 rounded-md">2025</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={ehasnInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
          >
            <p className="text-white text-center font-medium text-xs">
              إحصائيات تعكس أثر عطائكم عبر منصة إحسان لعام 2025
            </p>
            <div className="relative flex py-12 justify-center items-center gap-10 text-white z-[8]">
              <div className="bg-[#fff3] min-w-64 p-6 rounded-md flex flex-col items-center space-y-2">
                <img
                  className="w-10"
                  src="https://ehsan.sa/ehsan-ui/images/icons/total-donation-icon.svg"
                  alt=""
                />
                <p className="font-semibold">إجمالي التبرعات</p>
                <p className="text-4xl font-medium">100,000,000</p>
                <p className="font-semibold">جنية مصري</p>
              </div>
              <div className="bg-[#fff3] min-w-64 p-6 rounded-md flex flex-col items-center space-y-2">
                <img
                  className="w-10"
                  src="https://ehsan.sa/ehsan-ui/images/icons/total-beneficiary-icon.svg"
                  alt=""
                />
                <p className="font-semibold">عدد المستفيدين</p>
                <p className="text-4xl font-medium">214,030</p>
                <p className="font-semibold">مستفيد</p>
              </div>
              <div className="bg-[#fff3] p-6 min-w-64 rounded-md flex flex-col items-center space-y-2">
                <img
                  className="w-10"
                  src="	https://ehsan.sa/ehsan-ui/images/icons/total-donation-transactions-icon.svg"
                  alt=""
                />
                <p className="font-semibold">عدد عمليات التبرع</p>
                <p className="text-4xl font-medium">39,096,685</p>
                <p className="font-semibold">عملية تبرع</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Create Account */}
      <motion.div
        ref={createAccountRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          createAccountInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
      >
        <div className="my-16">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-1">
              <img
                src="https://ehsan.sa/ehsan-ui/images/snapel/one-small-green.svg"
                alt=""
              />
              <h1 className="text-[#003f6a] text-3xl font-bold">
                أنشئ حسابك في منصة إحسان
              </h1>
            </div>
            <p className="text-gray-400 text-xl font-medium">
              اطلع على كل جديد وساهم في صناعة الأثر
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start justify-center w-1/2 p-20 space-y-4">
              <div className="flex items-center gap-6 border-b-2 border-gray-300 w-full pb-6">
                <div className="bg-[#f6fef9] text-[#009174] border border-[#009174] rounded-full p-3 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 23"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.97607 12.2334H9.02812C9.25212 12.2274 12.4471 12.1004 14.5381 9.96943C16.6541 7.81243 16.7491 4.50035 16.7521 4.36035C16.7571 4.15535 16.6771 3.95838 16.5321 3.81338C16.3881 3.66838 16.1922 3.58943 15.9852 3.59443C15.9844 3.59446 15.9834 3.59449 15.9821 3.59454C15.8911 3.59757 14.5493 3.64227 13.0461 4.21338C12.6581 4.36038 12.4641 4.79337 12.6111 5.18037C12.7581 5.56837 13.1911 5.76243 13.5781 5.61543C14.1621 5.39343 14.7221 5.26638 15.1581 5.19238C14.9991 6.17438 14.5781 7.78643 13.4661 8.91943C12.6421 9.75943 11.5611 10.2114 10.6671 10.4544C11.2541 9.45739 11.8521 8.05638 11.8521 6.48438C11.8521 3.46238 9.64312 1.07139 9.54912 0.971387C9.40712 0.820387 9.20915 0.734375 9.00215 0.734375C8.79515 0.734375 8.59708 0.820387 8.45508 0.971387C8.36108 1.07139 6.1521 3.46238 6.1521 6.48438C6.1521 8.05638 6.75011 9.45739 7.33711 10.4544C6.44311 10.2114 5.36213 9.75943 4.53813 8.91943C3.42513 7.78543 3.00414 6.17338 2.84614 5.19238C3.28214 5.26538 3.84212 5.39343 4.42612 5.61543C4.81312 5.76243 5.24611 5.56737 5.39311 5.18037C5.54011 4.79337 5.3451 4.36038 4.9581 4.21338C3.4341 3.63438 2.07614 3.59543 2.01914 3.59443C1.81714 3.59043 1.61712 3.66838 1.47212 3.81338C1.32712 3.95838 1.2481 4.15535 1.2521 4.36035C1.2541 4.50035 1.34911 7.81243 3.46611 9.96943C5.55711 12.1004 8.75107 12.2274 8.97607 12.2334ZM7.65107 6.4834C7.65107 4.9154 8.44107 3.50344 9.00107 2.69844C9.56207 3.50344 10.3511 4.9164 10.3511 6.4834C10.3511 8.0504 9.56207 9.46336 9.00107 10.2684C8.44007 9.46336 7.65107 8.0514 7.65107 6.4834Z"
                      fill="#007960"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.87705 19.2372C6.35505 19.2372 5.83603 19.0692 5.38603 18.7392L3.39702 17.2782C3.06302 17.0332 2.99103 16.5632 3.23603 16.2302C3.48103 15.8962 3.95003 15.8241 4.28403 16.0691L6.27207 17.5292C6.58207 17.7562 6.968 17.7961 7.304 17.6361C7.38478 17.5981 7.50346 17.5512 7.71674 17.4668L7.75098 17.4532C8.03998 17.3392 8.80305 17.0372 9.20605 16.8292C9.15105 16.6302 9.04404 16.4552 8.89404 16.3262C8.71804 16.1752 8.50404 16.1111 8.29004 16.1441L8.12002 16.1702L8.11664 16.1707C7.39221 16.2836 6.49068 16.4242 5.63701 15.7981L3.87402 14.5082C3.41002 14.1682 2.55402 14.2211 1.79902 14.2691L1.749 14.2722C1.48752 14.2881 1.23968 14.3032 0.998047 14.3032C0.584048 14.3032 0.248047 13.9672 0.248047 13.5532C0.248047 13.1392 0.584048 12.8032 0.998047 12.8032C1.20805 12.8032 1.45001 12.7882 1.70601 12.7722C2.66384 12.7122 3.85831 12.6374 4.76001 13.2981L6.52305 14.5882C6.86005 14.8352 7.24199 14.7902 7.88799 14.6892L8.06201 14.6622C8.70201 14.5622 9.36204 14.7532 9.86904 15.1872C9.99888 15.2984 10.1159 15.4224 10.219 15.5567L13.7748 13.914C13.7958 13.904 13.8168 13.896 13.8388 13.888C14.8468 13.53 15.9788 13.81 16.7238 14.6L17.3898 15.296C17.6658 15.584 17.7918 15.978 17.7348 16.377C17.6778 16.772 17.4498 17.11 17.1078 17.306L9.25777 21.864C8.84577 22.108 8.36977 22.234 7.88677 22.234L7.88775 22.233C7.63175 22.233 7.37283 22.197 7.12183 22.125L0.783793 20.233C0.386792 20.115 0.160788 19.697 0.279788 19.3C0.397788 18.903 0.815796 18.677 1.2128 18.796L7.5438 20.6859C7.8698 20.7799 8.21178 20.7389 8.49878 20.5689L16.1238 16.142L15.6368 15.633C15.2978 15.273 14.8158 15.146 14.3688 15.291L10.7423 16.9665C10.7461 17.025 10.748 17.0839 10.748 17.1432C10.748 17.8202 10.1141 18.1312 8.30205 18.8472C8.15405 18.9052 7.98704 18.9722 7.94404 18.9922C7.60104 19.1552 7.23798 19.2351 6.87598 19.2361L6.87705 19.2372ZM16.3587 16.005C16.3587 16.005 16.3578 16.005 16.3568 16.006L16.3587 16.005Z"
                      fill="#007960"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  <h1 className="font-bold">أدم عطاءك</h1>
                  <p className="text-gray-400 text-xs font-medium">
                    شاهد أثر كرمك وكن مطلعاً على تقارير حالاتٍ استفادت من دعمك.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 border-b-2 border-gray-300 w-full pb-6">
                <div className="bg-[#f6fef9] text-[#009174] border border-[#009174] rounded-full p-3 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2005 10.9046C13.6205 11.1546 13.9705 11.2346 14.2605 11.2346L14.2805 11.2446C14.6305 11.2446 14.8805 11.1146 15.0305 11.0046C15.3105 10.7946 15.7405 10.3046 15.4905 9.24458L15.2205 7.97456L16.2105 6.97456C16.6905 6.48456 16.8805 5.9146 16.7105 5.3846C16.5405 4.8646 16.0605 4.49459 15.3805 4.37459L14.1405 4.17451C14.1205 4.16451 14.0805 4.15462 14.0805 4.15462L13.3805 2.73457C13.0705 2.10457 12.5705 1.73457 12.0205 1.73457C11.4905 1.72457 10.9605 2.09457 10.6405 2.73457L9.93057 4.16463L8.64053 4.37459C7.97053 4.49459 7.49046 4.85459 7.32046 5.37459C7.15046 5.90459 7.33057 6.48456 7.81057 6.97456L8.81057 8.0146L8.53054 9.24458C8.28054 10.3046 8.70049 10.8046 8.98049 11.0046C9.26049 11.2046 9.86055 11.4546 10.7906 10.9046L12.0105 10.1945L13.2005 10.9046ZM12.7805 8.89461C12.5605 8.76461 12.2805 8.69453 12.0005 8.69453L12.0305 8.68452C11.7505 8.68452 11.4705 8.7546 11.2405 8.8846L10.0506 9.59456C10.0427 9.5985 10.0363 9.60401 10.0303 9.60922C10.0211 9.61724 10.0126 9.62459 10.0005 9.62459C10.0005 9.60459 10.0105 9.55452 10.0105 9.55452L10.2906 8.31453C10.3906 7.82453 10.2205 7.24462 9.88052 6.90462L8.89053 5.90462C8.88345 5.89753 8.87636 5.8917 8.86971 5.88623C8.85759 5.87625 8.84694 5.86749 8.84048 5.85457C8.85048 5.84457 8.89053 5.84456 8.89053 5.84456L10.1905 5.6346C10.6205 5.5546 11.0605 5.22453 11.2805 4.81453L11.9805 3.40462C11.9849 3.39585 11.9912 3.38707 11.9969 3.37914C12.0042 3.36897 12.0105 3.36018 12.0105 3.35457C12.0205 3.36457 12.0305 3.39461 12.0305 3.39461L12.7405 4.83455C12.9505 5.22455 13.3905 5.55461 13.8505 5.64461L15.1205 5.85457C15.1405 5.86457 15.1606 5.86458 15.1806 5.86458C15.1606 5.87458 15.1305 5.91463 15.1305 5.91463L14.1405 6.91463C13.8005 7.26463 13.6305 7.84456 13.7305 8.34456L14.0105 9.57454C14.0205 9.59454 14.0205 9.6146 14.0205 9.6346C14.0005 9.6246 13.9705 9.60457 13.9705 9.60457L12.7805 8.89461Z"
                      fill="#067647"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.25 22.4844C1.25 22.8944 1.59 23.2344 2 23.2344H22C22.41 23.2344 22.75 22.8944 22.75 22.4844C22.75 22.0744 22.41 21.7344 22 21.7344H21.25V20.4844C21.25 18.9144 21.25 18.0544 20.59 17.3944C19.93 16.7344 19.07 16.7344 17.5 16.7344H17C16.501 16.7344 16.0955 16.7344 15.75 16.7871V16.4844C15.75 14.9144 15.75 14.0544 15.09 13.3944C14.43 12.7344 13.57 12.7344 12 12.7344C10.43 12.7344 9.57003 12.7344 8.91003 13.3944C8.53767 13.7668 8.37538 14.2028 8.30465 14.794C7.94933 14.7344 7.52679 14.7344 7.00003 14.7344H6.5C4.93 14.7344 4.07003 14.7344 3.41003 15.3944C2.75003 16.0544 2.75 16.9144 2.75 18.4844V21.7344H2C1.59 21.7344 1.25 22.0744 1.25 22.4844ZM14.25 21.7344H9.75V16.4844C9.75 15.3946 9.75 14.6743 9.96997 14.4543C10.1899 14.2344 10.9098 14.2344 11.9996 14.2344C13.0893 14.2344 13.8101 14.2344 14.03 14.4543C14.25 14.6743 14.25 15.3942 14.25 16.4839V21.7344ZM19.75 20.4844V21.7344H15.75V19.4844C15.75 18.9944 15.7501 18.3743 15.8101 18.3143C15.89 18.2344 16.5093 18.2344 16.9992 18.2344H17.5C18.5898 18.2344 19.3101 18.2344 19.53 18.4543C19.75 18.6743 19.75 19.3946 19.75 20.4844ZM4.25 21.7344H8.25V17.4844C8.25 16.9945 8.25 16.3744 8.17004 16.2944C8.11004 16.2344 7.49 16.2344 7 16.2344H6.5C5.41025 16.2344 4.68994 16.2344 4.46997 16.4543C4.25 16.6743 4.25 17.3942 4.25 18.4839V21.7344Z"
                      fill="#067647"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  <h1 className="font-bold">أدر تفضيلاتك</h1>
                  <p className="text-gray-400 text-xs font-medium">
                    تحكَّمْ باستعراض الفرص لتكون في مجال اهتماماتك.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 border-b-2 border-gray-300 w-full pb-6">
                <div className="bg-[#f6fef9] text-[#009174] border border-[#009174] rounded-full p-3 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 22"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.61572 1.05082C10.599 0.304921 12.2232 -0.130843 13.9995 0.969781C15.2685 1.75601 15.9396 3.36548 15.7026 5.15101C15.4633 6.95273 14.3159 8.94249 11.9624 10.702L11.8748 10.7676C11.1033 11.3454 10.4897 11.805 9.50009 11.805C8.51049 11.805 7.89689 11.3454 7.12541 10.7676L7.03774 10.702C4.68431 8.94249 3.53684 6.95273 3.29761 5.15101C3.06054 3.36548 3.73173 1.75601 5.00066 0.969781C6.77702 -0.130843 8.40116 0.304921 9.38447 1.05082L9.50009 1.13837L9.61572 1.05082ZM13.2095 2.24487C12.036 1.5178 11.0856 1.81857 10.5223 2.24589L10.5044 2.25941C10.3614 2.36795 10.2259 2.47076 10.1143 2.54453C10.055 2.58377 9.97941 2.63043 9.89517 2.66888C9.8167 2.7047 9.67637 2.75914 9.50009 2.75914C9.32381 2.75914 9.18349 2.7047 9.10501 2.66888C9.02077 2.63043 8.94522 2.58377 8.88587 2.54453C8.77432 2.47076 8.63881 2.36795 8.49573 2.2594L8.47793 2.24589C7.9146 1.81857 6.96416 1.5178 5.7907 2.24487C5.12398 2.65796 4.60835 3.62646 4.78456 4.95358C4.95863 6.26452 5.82456 7.9221 7.93592 9.50064C8.82317 10.164 9.05157 10.305 9.50009 10.305C9.94861 10.305 10.177 10.164 11.0643 9.50064C13.1756 7.9221 14.0416 6.26452 14.2156 4.95358C14.3918 3.62646 13.8762 2.65796 13.2095 2.24487Z"
                      fill="#067647"
                    ></path>
                    <path
                      d="M0.250488 13.0554C0.250488 12.6412 0.586275 12.3054 1.00049 12.3054H3.39531C3.80184 12.3054 4.2037 12.397 4.56931 12.5739L6.61129 13.5619C6.77186 13.6395 6.95022 13.6805 7.13199 13.6805H8.17461C9.01195 13.6805 9.76959 14.0759 10.2431 14.6962L14.3699 13.4283L14.3714 13.4278C15.5019 13.0763 16.7124 13.4991 17.4053 14.4586C18.0268 15.3192 17.7867 16.5608 16.8535 17.0992L9.3379 21.4355C8.68291 21.8135 7.90645 21.907 7.182 21.692L0.786841 19.7944C0.389742 19.6765 0.163351 19.2591 0.281183 18.862C0.399017 18.4649 0.816452 18.2385 1.21355 18.3563L7.60871 20.254C7.93582 20.3511 8.28722 20.31 8.58826 20.1363L16.1038 15.7999C16.2452 15.7184 16.3053 15.4974 16.1893 15.3368C15.8624 14.8842 15.3135 14.7054 14.8161 14.8604L14.8132 14.8612L10.749 16.1099C10.75 16.139 10.7505 16.1681 10.7505 16.1974C10.7505 16.5886 10.4842 16.9084 10.1341 17.0052L7.59323 17.7078C6.96271 17.8821 6.28745 17.8218 5.69883 17.537L3.51594 16.4808C3.14308 16.3004 2.98706 15.8519 3.16747 15.479C3.34787 15.1062 3.79639 14.9501 4.16925 15.1305L6.35214 16.1867C6.61153 16.3122 6.9124 16.3397 7.1935 16.262L9.12774 15.7272C8.95166 15.4087 8.60114 15.1805 8.17461 15.1805H7.13199C6.72545 15.1805 6.32359 15.089 5.95798 14.9121L3.916 13.9241C3.75543 13.8464 3.57707 13.8054 3.39531 13.8054H1.00049C0.586275 13.8054 0.250488 13.4696 0.250488 13.0554Z"
                      fill="#067647"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  <h1 className="font-bold">شارك الأجر</h1>
                  <p className="text-gray-400 text-sm font-medium">
                    دُلَّ على الخير لتكون كفاعله.{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 border-b-2 border-gray-300 w-full pb-6">
                <div className="bg-[#f6fef9] text-[#009174] border border-[#009174] rounded-full p-3 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.75 1.05566C1.75 0.64145 1.41421 0.305664 1 0.305664C0.585788 0.305664 0.25 0.64145 0.25 1.05566V12.1114C0.249983 13.714 0.249969 14.993 0.38483 15.9961C0.524152 17.0323 0.819657 17.8857 1.4948 18.5609C2.16994 19.236 3.02335 19.5315 4.05961 19.6708C5.0627 19.8057 6.34166 19.8057 7.94426 19.8057H19C19.4142 19.8057 19.75 19.4699 19.75 19.0557C19.75 18.6415 19.4142 18.3057 19 18.3057H8C6.32888 18.3057 5.15099 18.3041 4.25949 18.1842C3.41236 18.0703 2.93109 17.8615 2.58326 17.5275C2.59995 17.5068 2.61571 17.485 2.63043 17.4622L6.96239 10.741C7.13466 10.7833 7.31471 10.8057 7.5 10.8057C7.88156 10.8057 8.24093 10.7107 8.55577 10.5431L11.4186 12.6996C11.3099 12.9635 11.25 13.2526 11.25 13.5557C11.25 14.7983 12.2574 15.8057 13.5 15.8057C14.7426 15.8057 15.75 14.7983 15.75 13.5557C15.75 13.0631 15.5917 12.6075 15.3233 12.237L17.4702 7.80547L17.5 7.80566C18.7426 7.80566 19.75 6.7983 19.75 5.55566C19.75 4.31302 18.7426 3.30566 17.5 3.30566C16.2574 3.30566 15.25 4.31302 15.25 5.55566C15.25 6.24915 15.5637 6.86936 16.057 7.2821L14.0721 11.3791C13.8895 11.3312 13.6977 11.3057 13.5 11.3057C13.1103 11.3057 12.7437 11.4047 12.4241 11.5791L9.57316 9.43151C9.68703 9.16231 9.75 8.86634 9.75 8.55566C9.75 7.31302 8.74264 6.30566 7.5 6.30566C6.25736 6.30566 5.25 7.31302 5.25 8.55566C5.25 9.06746 5.42088 9.53934 5.70869 9.91738L1.87998 15.8577C1.87708 15.8374 1.87424 15.8169 1.87145 15.7962C1.75159 14.9047 1.75 13.7268 1.75 12.0557V1.05566ZM16.75 5.55566C16.75 5.14145 17.0858 4.80566 17.5 4.80566C17.9142 4.80566 18.25 5.14145 18.25 5.55566C18.25 5.96988 17.9142 6.30566 17.5 6.30566C17.0858 6.30566 16.75 5.96988 16.75 5.55566ZM7.5 7.80566C7.08579 7.80566 6.75 8.14145 6.75 8.55566C6.75 8.96988 7.08579 9.30566 7.5 9.30566C7.91421 9.30566 8.25 8.96988 8.25 8.55566C8.25 8.14145 7.91421 7.80566 7.5 7.80566ZM13.5 12.8057C13.0858 12.8057 12.75 13.1415 12.75 13.5557C12.75 13.9699 13.0858 14.3057 13.5 14.3057C13.9142 14.3057 14.25 13.9699 14.25 13.5557C14.25 13.1415 13.9142 12.8057 13.5 12.8057Z"
                      fill="#067647"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  <h1 className="font-bold">تتبَّع نشاطاتك</h1>
                  <p className="text-gray-400 text-xs font-medium">
                    استعرضْ إحصائيات وسجلات إحسانك.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-1/2 p-20">
              <img
                src="https://ehsan.sa/ehsan-ui/images/slider/slider-1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
