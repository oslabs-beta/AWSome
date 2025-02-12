import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { addGraph } from '../state/graph-reducer.js';

export default function DropDownMenu() {
  const dispatch = useDispatch();


  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="bg-pink-700 flex flex-col absolute left-1/2 transform -translate-x-1/2 text-md py-2 px-10 rounded-lg mt-3 transition duration-150 ease-in-out">
          Add Metrics
        </MenuButton>
      </div>

      <MenuItems
        transition
        className=" absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 bg-purple-600">
          <input id="metricBar" className="text-blue-600"></input>
          <MenuItem>
            <button
              className=" text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={() =>
                dispatch(
                  addGraph({
                    type: "bar",
                    metric: document.getElementById("metricBar").value,
                  })
                )
              }
            >
              Bar Graph
            </button>
          </MenuItem>
          <input id="metricLine" className="text-blue-600"></input>
          <MenuItem>
            <button
              className="text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={() =>
                dispatch(
                  addGraph({
                    type: "areaLine",
                    metric: document.getElementById("metricLine").value,
                  })
                )
              }
            >
              Line Graph
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
