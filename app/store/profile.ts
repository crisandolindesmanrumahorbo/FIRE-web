import { create } from "zustand";

export interface IProfile {
  name: string;
  user_id: string;
}
export type ProfileStore = {
  profile?: IProfile;
  setProfile: (data: IProfile) => void;
};

export const useProfile = create<ProfileStore>((set) => ({
  profile: undefined,
  setProfile: (data) => {
    set({
      profile: data,
    });
  },
}));
