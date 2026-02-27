import { usePathname, useRouter } from "expo-router";
import { colors } from "lib/colors";
import { AnimatedPressable } from "lib/utils";
import { JSX, useState } from "react";
import { StyleSheet } from "react-native";

export const MenuItem = (props: {children:JSX.Element, href: string}) => {
  const [pressed, setPressed] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  // const routerInfo = userou
  return <AnimatedPressable style={{
    backgroundColor: pathName !== props.href ? pressed ? colors["neutral-200"] : "transparent" : colors["primary-100"],
    padding: 12,
    color: pathName !== props.href ? colors["neutral-900"] : colors["primary-800"],
    borderRadius: 24,
    transitionProperty: ["backgroundColor"],
    transitionDuration: ".1s"
  }}
  onPressIn={() => setPressed(true)}
  onPressOut={() => {setPressed(false); router.navigate(props.href)}}
  >
    {props.children}
  </AnimatedPressable>
}


const styles = StyleSheet.create({
  menuitem: {
    padding: 12
  }
})