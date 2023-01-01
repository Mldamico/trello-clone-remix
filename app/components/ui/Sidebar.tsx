import { AiOutlineInbox, AiOutlineMail } from "react-icons/ai";
const menuItems = ["Element1", "Element2", " Element3", "Element4"];

export const Sidebar = () => {
  return (
    <div className="h-full py-2 dark:bg-darkPrimary">
      <h4 className="mb-6 ml-3 text-2xl">Menu</h4>
      <div className="divide-y divide-gray-600">
        <ul>
          {menuItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center py-3 space-x-6 text-xl cursor-pointer dark:hover:bg-gray-800"
            >
              <div className="ml-10">
                {i % 2 ? <AiOutlineInbox /> : <AiOutlineMail />}
              </div>
              <p>{item}</p>
            </li>
          ))}
        </ul>
        <ul>
          {menuItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center py-3 space-x-6 text-xl cursor-pointer dark:hover:bg-gray-800"
            >
              <div className="ml-10">
                {i % 2 ? <AiOutlineInbox /> : <AiOutlineMail />}
              </div>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
