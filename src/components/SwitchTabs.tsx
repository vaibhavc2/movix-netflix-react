import "@/styles/scss/other/components/switch-tabs.scss";
import { memo, useState } from "react";

type Props = {
  data: string[];
  onTabChange: (tab: string) => void;
};

const SwitchTabs = ({ data, onTabChange }: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const setActiveTab = (tab: string, index: number) => {
    setLeft(index * 100); // width of each tab is 100, so we multiply it by the index to get the left position of the moving background
    setSelectedTab(index);
    onTabChange(tab);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <div
            className={`tabItem ${selectedTab === index ? "active" : ""}}`}
            key={index}
            onClick={() => setActiveTab(tab, index)}
          >
            {tab}
          </div>
        ))}

        <span className={`movingBg`} style={{ left }} />
      </div>
    </div>
  );
};
export default memo(SwitchTabs);
