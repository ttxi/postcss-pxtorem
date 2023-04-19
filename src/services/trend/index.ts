// import { nextAPI } from '@/utils';
import { Action, apiBuilder } from '@/services/axios/next-api-builder';
import { nextAPI } from '@/services/axios/request';

export async function getTrendProject(payload) {
  const { ids = [], offset = 0, size = 20, filters = {}, sorts = ['!updated_time'] } = payload;
  const nextapi = apiBuilder
    .create(Action.trend2.ListTrendProjects, 'ListTrendProjects')
    .param({ ids, offset, size, filters, sorts });
  // .schema({
  //   project_trend:
  //     ids.length == 0 ? F.fields.trend2_sample_projects : F.fields.trend2_trend_projects,
  // });
  return nextAPI({ data: [nextapi.api] });
}
