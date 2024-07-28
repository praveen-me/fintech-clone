import RoundButton from "@/components/RoundButton";
import { JSXElementConstructor, ReactElement } from "react";
import * as DropdownMenu from "zeego/dropdown-menu";

type DropdownMenuProps = {
  TriggerComponent: React.ComponentType<any> | React.FC<any>;
  list: { title: string; icon: string; key: string }[];
};

export default function Dropdown(props: DropdownMenuProps) {
  const { list = [], TriggerComponent } = props;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TriggerComponent />
      </DropdownMenu.Trigger>

      {list.length > 0 && (
        <DropdownMenu.Content>
          {props.list.map((item) => (
            <DropdownMenu.Item key={item.key} onFocus={() => {}}>
              <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon
                ios={{
                  name: item.icon,
                  pointSize: 24,
                }}
              ></DropdownMenu.ItemIcon>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      )}
    </DropdownMenu.Root>
  );
}
