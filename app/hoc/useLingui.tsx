import React, { ReactNode } from "react";
import { setI18n } from "@lingui/react/server";
import { allI18nInstances } from "../appRouterI18n";
import { PageLangParam } from "../initLingui";

export type QueryParams = Promise<{ [key: string]: string }>;

type PageProps = PageLangParam & { query?: QueryParams };

type PageExposedToNextJS<Props extends PageProps> = (props: Props) => ReactNode;

export const withLinguiPage = <Props extends PageProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>,
): PageExposedToNextJS<Props> => {
  return async function WithLingui(props) {
    const { lang } = await props?.params;
    const i18n = allI18nInstances[lang];
    setI18n(i18n);

    return <AppRouterPage {...props} lang={lang} />;
  };
};
