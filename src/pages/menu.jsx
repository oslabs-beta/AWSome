import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { addGraph } from '../state/graph-reducer.js';

export default function DropDownMenu() {
  const dispatch = useDispatch();

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <MenuButton className='bg-pink-600 hover:bg-pink-700 text-sm py-1 px-4 rounded-lg '>
          Add Metrics
        </MenuButton>
      </div>

      <MenuItems
        transition
        className=' absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
      >
        <div className='py-1 bg-purple-600'>
          <MenuItem>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <MenuButton>
                  <p className=' text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'>
                    Bar Graph
                  </p>
                </MenuButton>
              </div>

              <MenuItems
                transition
                className=' absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
              >
                <div className='py-1 bg-purple-600'>
                  <MenuItem>
                    <button
                      className=' text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'bar',
                            metric: 'NetworkOut',
                          })
                        )
                      }
                    >
                      NetworkOut
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'bar',
                            metric: 'NetworkIn',
                          })
                        )
                      }
                    >
                      NetworkIn
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'bar',
                            metric: 'EBSWriteOps',
                          })
                        )
                      }
                    >
                      EBSWriteOps
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'bar',
                            metric: 'EBSReadOps',
                          })
                        )
                      }
                    >
                      EBSReadOps
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'bar',
                            metric: 'CPUUtilization',
                          })
                        )
                      }
                    >
                      CPUUtilization
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </MenuItem>
          <MenuItem>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <MenuButton>
                  <p className=' text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'>
                    Line Graph
                  </p>
                </MenuButton>
              </div>

              <MenuItems
                transition
                className=' absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
              >
                <div className='py-1 bg-purple-600'>
                  <MenuItem>
                    <button
                      className=' text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'areaLine',
                            metric: 'NetworkOut',
                          })
                        )
                      }
                    >
                      NetworkOut
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'areaLine',
                            metric: 'NetworkIn',
                          })
                        )
                      }
                    >
                      NetworkIn
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'areaLine',
                            metric: 'EBSWriteOps',
                          })
                        )
                      }
                    >
                      EBSWriteOps
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'areaLine',
                            metric: 'EBSReadOps',
                          })
                        )
                      }
                    >
                      EBSReadOps
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className='text-pink-50 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                      onClick={() =>
                        dispatch(
                          addGraph({
                            type: 'areaLine',
                            metric: 'CPUUtilization',
                          })
                        )
                      }
                    >
                      CPUUtilization
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
