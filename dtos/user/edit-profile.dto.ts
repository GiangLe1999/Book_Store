import { UserEntity } from "@/entities/user.entity";
import { CoreOutput, IDatabaseImage } from "../common.dto";

export interface EditProfileInput extends Partial<Omit<UserEntity, "avatar">> {
  id: string;
  avatar?: string | IDatabaseImage;
}

export interface EditProfileOutput extends CoreOutput {}
