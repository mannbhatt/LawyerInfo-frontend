export default function HeroSection() {
    return (
      <section className="relative h-[750px] w-full overflow-hidden" id="hero">
       
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_1280.jpg)",
              backgroundSize:"cover"
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
  
        
        <div className="relative flex h-full flex-col items-center justify-center px-4 top-28 text-center">
          <h1 className="mb-6  max-w-4xl text-5xl md:leading-7 font-semibold tracking-tight text-white  ">
            Find and Connect with Amazing Profiles
          </h1>
  
        
          <div className="w-full max-w-[54rem] space-y-4">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1">
                 <div className="relative">
                   <svg
                    className="absolute left-2 top-[10px] h-6 w-6 text-[#4a0e01]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                   >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name or expertise..."
                  className="h-12 w-full border-0 bg-white/95 pl-10 pr-4 text-gray-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 outline-none"
                />
                </div>
              </div>
              <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-2 top-[10px] h-6 w-6 text-[#4a0e01]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 395.71 395.71"
                  fill="currentColor"
                >
                  <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z" />
                </svg>
                <input
                  type="text"
                  placeholder="Location..."
                  className="h-12 w-full border-0 bg-white/95 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 outline-none"
                />
              </div>
              </div>
              <button className="inline-flex h-12 items-center justify-center  bg-[#ff3003] px-8 text-lg  text-white transition-colors hover:bg-[#ff4b22] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
               
                Search
              </button>
            </div>
          </div>
          <h2 className="mt-4 text-2xl md:text-[1.78rem] md:leading-[1.25rem] text-white/90 font-semibold">Discover and connect with professionals from around the world</h2>
        </div>
      </section>
    )
  }
  
  