// app/notification/NotificationIcon.tsx

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotificationIcon() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(false);

    const fetchNotifications = async () => {
        const res = await fetch(`${process.env.API_BASE_URL}/notifications`);
        if (res.ok) {
            const data = await res.json();
            setNotifications(data);
        }
    };

    const handleIconClick = () => {
        setShowPopup(!showPopup);
        if (!showPopup) {
            fetchNotifications();
        }
    };

    return (
        <div className="relative">
            <button onClick={handleIconClick} className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-500 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.9 14.6V11a7.002 7.002 0 00-5-6.71V3a1 1 0 00-2 0v1.29A7.002 7.002 0 006 11v3.6a2.032 2.032 0 01-.595 1.995L4 17h5m0 0a3 3 0 006 0m-6 0h6"
                    />
                </svg>
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                )}
            </button>

            {showPopup && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-500 shadow-lg rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2 text-black dark:text-white">Notifications</h4>
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.map((notification, index) => (
                                <li key={index} className="mb-2 text-gray-800 dark:text-gray-200">
                                    {notification.message} - {new Date(notification.created_at).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-black dark:text-white">Aucune nouvelle notification</p>
                    )}
                    <Link href="/notification/NotificationSignup">
                        <button className="mt-4 w-full bg-blue-500 text-white py-1 rounded">
                            S'inscrire aux Notifications
                        </button>
                    </Link>
                    
                </div>
            )}
        </div>
    );
}


// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function NotificationIcon() {
//     const [notifications, setNotifications] = useState<any[]>([]);
//     const [showPopup, setShowPopup] = useState(false);

//     const fetchNotifications = async () => {
//         const res = await fetch(`${process.env.API_BASE_URL}/notifications`);
//         const data = await res.json();
//         setNotifications(data);
//     };

//     const handleIconClick = () => {
//         setShowPopup(!showPopup);
//         if (!showPopup) {
//             fetchNotifications();
//         }
//     };

//     return (
//         <div className="relative">
//             <button onClick={handleIconClick} className="relative">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-8 w-8 text-yellow-500 dark:text-blue-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.9 14.6V11a7.002 7.002 0 00-5-6.71V3a1 1 0 00-2 0v1.29A7.002 7.002 0 006 11v3.6a2.032 2.032 0 01-.595 1.995L4 17h5m0 0a3 3 0 006 0m-6 0h6"
//                     />
//                 </svg>
//                 {notifications.length > 0 && (
//                     <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
//                 )}
//             </button>

//             {showPopup && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-500 shadow-lg rounded-lg p-4">
//                     <h4 className="text-lg font-semibold mb-2 text-black dark:text-white">Notifications</h4>
//                     {notifications.length > 0 ? (
//                         <ul>
//                             {notifications.map((notification, index) => (
//                                 <li key={index} className="mb-2 text-gray-800 dark:text-gray-200">
//                                     {notification.message} - {new Date(notification.created_at).toLocaleString()}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-black dark:text-white">Aucune nouvelle notification</p>
//                     )}
//                     <Link href="app/notification/NotificationSignup">
//                         <button className="mt-4 w-full bg-blue-500 text-white py-1 rounded">
//                             S'inscrire aux Notifications
//                         </button>
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }



// 'use client'

    // import { useState } from 'react'

    // export default function NotificationIcon() {
    // const [notifications, setNotifications] = useState<any[]>([])
    // const [showPopup, setShowPopup] = useState(false)

    // const fetchNotifications = async () => {
    //     const res = await fetch('/notifications')
    //     const data = await res.json()
    //     setNotifications(data)
    // }

    // const handleIconClick = () => {
    //     setShowPopup(!showPopup)
    //     if (!showPopup) {
    //     fetchNotifications()
    //     }
    // }

    // return (
    //     <div className="relative">
    // <button onClick={handleIconClick} className="relative">
    // <svg 
    //     xmlns="http://www.w3.org/2000/svg" 
    //     className="h-8 w-8 text-yellow-500 dark:text-blue-300"  // Ajustement de la couleur pour les thèmes clair et sombre
    //     fill="none" 
    //     viewBox="0 0 24 24" 
    //     stroke="currentColor"
    // >
    //     <path 
    //     strokeLinecap="round" 
    //     strokeLinejoin="round" 
    //     strokeWidth={2} 
    //     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.9 14.6V11a7.002 7.002 0 00-5-6.71V3a1 1 0 00-2 0v1.29A7.002 7.002 0 006 11v3.6a2.032 2.032 0 01-.595 1.995L4 17h5m0 0a3 3 0 006 0m-6 0h6" 
    //     />
    // </svg>
    // {notifications.length > 0 && (
    //     <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
    // )}
    // </button>


    //     {showPopup && (
    //         <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-500 shadow-lg rounded-lg p-4">
    //         <h4 className="text-lg font-semibold mb-2 text-black dark:text-white">Notifications</h4>
    //         {notifications.length > 0 ? (
    //             <ul>
    //             {notifications.map((notification, index) => (
    //                 <li key={index} className="mb-2 text-gray-800 dark:text-gray-200">
    //                 {notification.message} - {new Date(notification.created_at).toLocaleString()}
    //                 </li>
    //             ))}
    //             </ul>
    //         ) : (
    //             <p className="text-black dark:text-white">Aucune nouvelle notification</p>
    //         )}
    //         </div>
    //     )}
    //     </div>
    // )
    // }
