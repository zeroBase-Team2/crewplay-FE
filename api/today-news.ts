import { TSelectedMenu } from "@/app/today-news/page";
import { IResponse } from "@/interface/response";
import axios, { isAxiosError } from "axios";

export interface INews {
  readonly newsDateTime: string;
  readonly headline: string;
  readonly newsLink: string;
  readonly thumbnail: string;
}

interface IPagination {
  readonly pageNumber: number; // 현재 페이지 수
  readonly totalPage: number; // 전체 페이지 수
  readonly totalData: number; // 전체 데이터
}

export const getTodayIssue = async (
  selectedMenu: TSelectedMenu,
): Promise<IResponse<{ dataList: INews[] } & IPagination>> => {
  const url = selectedMenu === "news" ? "/api/v1/news/" : "/api/v1/news/video";

  try {
    const { data } = await axios.get(url);

    return {
      status: "success",
      data: data.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: "error",
        error: error.message,
      };
    }

    return {
      status: "error",
      error: "알 수 없는 오류가 발생하였습니다.",
    };
  }
};
