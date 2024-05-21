import { IsBoolean, IsNotEmpty, Length } from "class-validator";
import { offsetLimit } from "../../utils/structure/general_type";
import { FilterType } from "../../utils/basicRepository/defaultRepo";

export class typeTbOrang {
  id?: string;
  @IsNotEmpty()
  @Length(1, 2)
  nama?: string;
  @IsNotEmpty()
  umur?: number;
  @IsNotEmpty()
  @IsBoolean()
  pria?: boolean;
  @IsNotEmpty()
  alamat?: string;
}

export type ConfigFilterTbOrang = FilterType<typeTbOrang>;
export type tbOrangeRequest = typeTbOrang & offsetLimit;
