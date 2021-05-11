import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

export interface SliderProps {
  backgroundColor?: string;
}
export type LoginRouteProp = RouteProp<RootStackParamList, "Login">;
export type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;