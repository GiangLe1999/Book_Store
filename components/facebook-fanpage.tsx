import { FC } from "react";

interface Props {}

const FacebookFanpage: FC<Props> = (props): JSX.Element => {
  return (
    <div
      className="fb-page"
      data-href="https://www.facebook.com/khosach247online"
      data-tabs="timeline"
      data-width=""
      data-height=""
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    >
      <blockquote
        cite="https://www.facebook.com/khosach247online"
        className="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/khosach247online">Kho Sách 247</a>
      </blockquote>
    </div>
  );
};

export default FacebookFanpage;
