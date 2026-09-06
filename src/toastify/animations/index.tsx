import type {
  AnimationPreset,
  ToastAnimationComponent,
  ToastAnimationProps,
} from "../types";
import { FadeAnimation } from "./FadeAnimation";
import { FolderStackAnimation } from "./FolderStackAnimation";
import { SlideAnimation } from "./SlideAnimation";

export { FolderStackAnimation, SlideAnimation, FadeAnimation };

/**
 * ToastAnimation Component
 * Dispatches to preset animation or custom animation component.
 */
export function ToastAnimation({
  animation = "stack",
  ...props
}: ToastAnimationProps & {
  animation?: AnimationPreset | ToastAnimationComponent;
}) {
  if (typeof animation === "function") {
    const CustomAnimation = animation;
    return <CustomAnimation {...props} />;
  }
  if (animation === "slide") {
    return <SlideAnimation {...props} />;
  }
  if (animation === "fade") {
    return <FadeAnimation {...props} />;
  }
  return <FolderStackAnimation {...props} />;
}
