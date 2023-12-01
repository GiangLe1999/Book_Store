import { UserEntity } from "@/entities/user.entity";
import { CoreOutput } from "../common.dto";

export interface MyProfileOutput extends CoreOutput {
  user: UserEntity;
}
