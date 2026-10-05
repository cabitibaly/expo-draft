import Svg, { Path } from "react-native-svg";

type IconProps = {
    color?: string;
    size?: number;
};

export function FlashOffIcon({
    color = "#000000",
    size = 32,
}: IconProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 76 76"
            fill="none"
        >
            <Path
                d="M52.2519 18.9974L38 34.8333L50.6666 34.8333L25.3315 60.1667L34.8333 39.5833L23.7499 39.5833L36.4164 18.9974L52.2519 18.9974ZM18.2082 20.5834L23.7499 20.5834L29.6874 26.5209L27.3124 29.6876L18.2082 20.5834ZM42.75 45.9167L45.9166 42.75L57 53.8333L53.8333 56.9999L42.75 45.9167Z"
                fill={color}
                fillOpacity={1}
                strokeWidth={0.2}
                strokeLinejoin="round"
            />
        </Svg>
    );
}