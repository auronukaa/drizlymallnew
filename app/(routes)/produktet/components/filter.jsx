import React from "react";
import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";

const Filter = () => {
  return (
    <div className="flex">
      <div
        className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px]max-md:w-[250px]":"w-0 max-md:invisible"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px]">
          <h1 className="text-neutral-800">Filters</h1>
          <BsSliders2Vertical size={20} className="text-neutral-600" />
        </div>

        <div className="border-b-[0.5px] pb-10">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">Prices</h1>
            <BsChevronUp size={18} className="text-neutral-600" />
          </div>
          <div className="grid grid-cols-2 gap-5 px-5 overflow-hidden">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                Min
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">$</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="min"
                  id=""
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                Max
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">$</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="max"
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
