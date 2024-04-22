import React, { useState, useRef, useEffect } from "react"

export function Dropbox({ data, name, setValue }) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Toggle dropdown.
    const dropDown = () => {
        setOpen(!open);
    };

    // Select Item.
    const selectItem = (item) => {
        setValue(item);  // Select the item.
        setOpen(false);  // Close the bar.
    };

    return (
        <div class="inline-flex flex-col w-full h-full mx-1 my-1" ref={dropdownRef}>
            <button type="button" class="inline-flex justify-between content-center w-full my-1 px-2 py-2 bg-white border border-gray-300 shadow-sm hover:bg-gray-50"
                onClick={dropDown}
                aria-expanded={open}
                aria-haspopup="true">
                <div class='bold-400'>{name}</div>
                <div class='regular-400'>@</div>
            </button>
            {open && (<div class="right-0 mt-2 w-full my-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                aria-orientation="vertical">
                <div class="py-1">
                    {data.map(item => (
                        <div class="regular-400 hover:bg-ringle-purple hover:text-white hover:rounded-md"
                            onClick={() => selectItem(item)}
                        >{item}</div>
                    ))}
                </div>
            </div>)}
        </div>
    )
}