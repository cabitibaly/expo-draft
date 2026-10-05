import Svg, { Path } from "react-native-svg";

type IconProps = {
    color?: string;
    size?: number;
};

export function FlashAutoIcon({
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
                d="M49.0833 19L34.8313 34.836L47.498 34.836L22.1629 60.1693L31.6647 39.586L20.5813 39.586L33.2478 19L49.0833 19ZM50.9366 49.6415L46.4408 49.6415L45.3226 53.8215L41.6654 53.8215L46.4408 38.2916L51.0997 38.2916L55.9906 53.8215L52.1479 53.8215L50.9366 49.6415ZM46.9533 47.1161L50.4241 47.1161L49.4458 43.8164L49.0323 42.3165L48.6538 40.817L48.6072 40.817L48.2548 42.3301L47.885 43.8554L46.9533 47.1161Z"
                fill={color}
                fillOpacity={1}
                strokeWidth={0.2}
                strokeLinejoin="round"
            />
        </Svg>
    );
}