import Svg, { Path } from "react-native-svg";

type IconProps = {
    color?: string;
    size?: number;
};

export function FlashOnIcon({
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
                d="M52.252 18.9974L38 34.8333L50.6667 34.8333L25.3316 60.1667L34.8333 39.5833L23.75 39.5833L36.4164 18.9974L52.252 18.9974Z"
                fill={color}
                fillOpacity={1}
                strokeWidth={0.2}
                strokeLinejoin="round"
            />
        </Svg>
    );
}