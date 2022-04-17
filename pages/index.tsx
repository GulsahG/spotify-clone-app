import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import GradientLayout from "../components/gradientLayout";

export default function Home() {
  return (
    <GradientLayout
      color="brown"
      isRoundAvatar
      subtitle="profile"
      title="Gulsahgenc"
      description="19 Public Playlists - 106 Followers"
      avatar="https://i.scdn.co/image/ab6775700000ee8508d489fbe80dd6c89e0c2b70"
    >
      <div>homepage</div>
    </GradientLayout>
  );
}
