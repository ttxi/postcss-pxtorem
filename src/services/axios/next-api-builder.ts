import { isArray, mergeWith } from 'lodash';
/**
 *  Created by BoGao on 2017-10-25;
 *
 *  Note: Next API QueryBuilder
 */
class ParamError extends Error {
  constructor() {
    super();
    this.name = 'ParamError';
  }
}

function apiMerge(obj, source) {
  mergeWith(obj, source, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
}

// basic chains
const createBasicChains = (api) => {
  const chains = {
    api,
    param: (params, config) => {
      if (!config || config.when) {
        if (params) {
          if (!api.parameters) {
            api.parameters = {};
          }
          Object.keys(params).map((key) => {
            api.parameters[key] = params[key];
            return false;
          });
        }
      }
      return chains;
    },
    addParam: (params, config) => {
      if (!config || config.when) {
        if (!api.parameters) {
          api.parameters = {};
        }
        apiMerge(api.parameters, params);
      }
      return chains;
    },
    filter: (params, config) => {
      if (!config || config.when) {
        if (!api.parameters) {
          api.parameters = {};
        }
        api.parameters.filters = params;
      }
      return chains;
    },
    addFilter: (filterType, params, config) => {
      if (!config || config.when) {
        if (!api.parameters) {
          api.parameters = {};
        }
        api.parameters.filters = api.parameters.filters || {};
        if (!api.parameters.filters[filterType]) {
          api.parameters.filters[filterType] = {};
        }
        apiMerge(api.parameters.filters[filterType], params);
      }
      return chains;
    },
    schema: (schema, config) => {
      if (!config || config.when) {
        if (!api.schema) {
          api.schema = {};
        }
        api.schema = schema;
      }
      return chains;
    },
    addSchema: (schema, config) => {
      if (!config || config.when) {
        if (!api.schema) {
          api.schema = {};
        }
        apiMerge(api.schema, schema);
      }
      return chains;
    },
    primarySchema: (primarySchema, config) => {
      if (!config || config.when) {
        if (!api.primarySchema) {
          api.primarySchema = {};
        }
        api.primarySchema = primarySchema;
      }
      return chains;
    },
    addPrimarySchema: (primarySchema, config) => {
      if (!config || config.when) {
        if (!api.primarySchema) {
          api.primarySchema = {};
        }
        apiMerge(api.primarySchema, primarySchema);
      }
      return chains;
    },
  };
  return chains;
};

// Query api-builder.
const query = (action, eventName) => {
  if (!action) {
    throw new ParamError("Parameter action can't be empty.");
  }

  const api = {
    // type: 'query',
    action,
    eventName,
  };

  const chains = createBasicChains(api);
  return chains;
};

// Alter api-builder.
const alter = (action, eventName) => {
  if (!action) {
    throw new ParamError("Parameter action can't be empty.");
  }
  return createBasicChains({ action, eventName });
};

const notify = (action, eventName) => {
  if (!action) {
    throw new ParamError("Parameter action can't be empty.");
  }
  return createBasicChains({ action, eventName });
};

const create = (action, eventName) => {
  if (!action) {
    throw new ParamError("Parameter action can't be empty.");
  }
  return createBasicChains({ action, eventName });
};

/**
 * NEXT-API Query Builder
 */
const apiBuilder = {
  //
  // Query
  //
  query,

  alter,

  notify,

  create,

  // alter: () => {},
  // run: () => {},
};

// ------------------ Builtin Fields --------------------------

const F = {
  // Helper Options.

  // Type: { Query: 'query', Alter: 'alter', Magic: 'magic' },

  // all available entities in system.
  Entities: {
    Person: 'person',
    Publication: 'pub',
    Venue: 'venue',
  },

  // available person's tags.
  Tags: { systag: 'systag' },

  // query related // TODO @xiaobei 这些都是啥呀？？？
  queries: {
    search: 'search',
    RevieweRreport: 'RevieweRreport', // TODO @xiaobei ?????????,
    ReviewerQuery: 'ReviewerQuery',
    ReviewerDownloadCSV: 'ReviewerDownloadCSV',
    ReviewerClickPersons: 'ReviewerClickPersons',
  }, // query actions.

  alter: {
    alter: 'alter',
    ReviewerProject: 'ReviewerProject',
  },

  notify: { feedback: 'feedback' },

  searchType: { all: 'all', ToBPerson: 'ToBPerson' },

  // 预置的一些默认词
  // TODO thu系统上加了一个参数
  params: {
    default_aggregation: ['gender', 'h_index', 'nation', 'lang'],
  },

  // all available alter operations.
  opts: { upsert: 'upsert', update: 'update', delete: 'delete' },
  // alter operations, TODO this will be replaced by opts.
  alterop: { upsert: 'upsert', update: 'update', delete: 'delete' },

  alters: { alter: 'alter', dims: 'dims' }, // alter actions.

  // Available Fields
};

// Person related.
const fseg = {
  basic_fields: ['id', 'name', 'title', 'titles', 'name_zh', 'avatar'],
  indices_all: [
    'hindex',
    'gindex',
    'pubs',
    'citations',
    'newStar',
    'risingStar',
    'activity',
    'diversity',
    'sociability',
  ],
  // 'id', 'name', 'name_zh', 'avatar', 'tags', 'tags_translated_zh',
  // 'tags_zh', 'org', 'org_zh', 'bio', 'email', 'edu' ', phone'
};

F.fields = {
  person: { indices_all: fseg.indices_all },
  person_in_PersonList: [
    ...fseg.basic_fields,
    'tags',
    {
      profile: ['position', 'position_zh', 'affiliation', 'affiliation_zh', 'org', 'org_zh'],
    },
    { indices: fseg.indices_all },
  ],
  person_in_SmallList: [
    ...fseg.basic_fields,
    { indices: ['hindex', 'pubs', 'citations'] },
    { profile: ['affiliation', 'position'] },
  ],
  person_profile: [
    ...fseg.basic_fields,
    'pubs.i',
    'tags',
    'is_follow',
    'num_view',
    'num_follow',
    'bind',
    'revised',
    {
      profile: [
        'position',
        'position_zh',
        'affiliation',
        'affiliation_zh',
        'org',
        'org_zh',
        'gender',
        'lang',
        'note',
        'titles',
      ],
    },
    { indices: fseg.indices_all },
  ],
  person_profile_eb: [
    ...fseg.basic_fields,
    'pubs.i',
    'tags',
    'is_follow',
    'num_view',
    'num_follow',
    'bind',
    'revised',
    {
      profile: [
        'position',
        'position_zh',
        'affiliation',
        'affiliation_zh',
        'org',
        'org_zh',
        'gender',
        'lang',
        'note',
        'titles',
      ],
    },
    {
      indices: [
        'hindex',
        'gindex',
        'pubs',
        'citations',
        'newStar',
        'activity',
        'diversity',
        'sociability',
      ],
    },
  ],
  person_annotation: [
    ...fseg.basic_fields,
    'is_follow',
    'num_view',
    'num_follow',
    'bind',
    'updated_time',
    {
      profile: [
        'position',
        'position_zh',
        'affiliation',
        'affiliation_zh',
        'org',
        'org_zh',
        'email',
        'homepage',
      ],
    },
    { indices: fseg.indices_all },
  ],
  person_super: [
    ...fseg.basic_fields,
    'is_follow',
    'num_view',
    'num_follow',
    'bind',
    'updated_time',
    'names',
    'names_zh', // super mode
    'name_sorted',
    'name_zh_sorted', // super mode
    {
      profile: [
        'position',
        'position_zh',
        'affiliation',
        'affiliation_zh',
        'org',
        'org_zh',
        'email',
        'homepage',
      ],
    },
    { indices: fseg.indices_all },
  ],
  trend2_sample_projects: [
    'searches',
    'id',
    'name',
    'desc',
    'main_topic',
    'keywords',
    'created_time',
    'creator',
    'creator_id',
    'visits2',
    'start_year',
    'end_year',
    'is_public',
    'updated_time',
    'tag',
  ],
  trend2_trend_projects: [
    'id',
    'name',
    'desc',
    'main_topic',
    'trend_type',
    'venues',
    'keywords',
    'sub_setting',
    'created_time',
    'creator',
    'creator_id',
    'updated_time',
    'keywords_map',
    'searches',
    'start_year',
    'end_year',
    'venue_map',
    'is_public',
    'is_edited',
    'updated_time',
    'desc_map',
    'pubbase_type',
    'created_eb',
    'author_ids',
    'orgs',
    'apps',
    'report_title',
    'cover_path',
    'is_translate',
    'countrys',
    'provinces',
    'is_quickcreated',
    'conferences',
    'domains',
    'skip_cache',
    'match_fields',
    'citation_range',
    'source',
    'years',
    'tag',
  ],
};
const paperSearchFields = [
  'id',
  'year',
  'title',
  'title_zh',
  'abstract',
  'abstract_zh',
  'authors',
  'authors._id',
  'authors.name',
  'keywords',
  'authors.name_zh',
  'num_citation',
  'num_viewed',
  'num_starred',
  'num_upvoted',
  'is_starring',
  'is_upvoted',
  'is_downvoted',
  'venue.info.name',
  'venue.volume',
  'venue.info.name_zh',
  'venue.info.publisher',
  'venue.issue',
  'pages.start',
  'pages.end',
  'lang',
  'pdf',
  'ppt',
  'doi',
  'urls',
  'flags',
  'resources',
  'issn',
  'versions',
];
F.fields.paper = {
  forSearch: [...paperSearchFields],
  full: [...paperSearchFields, 'labels', 'versions', 'venue.info.id', 'venue.info.type'],
  pdfInfo: [
    'id',
    'url',
    'metadata',
    'sections',
    'participants',
    'keywords',
    'summary',
    'structured_summary',
    'reference_links',
    'findings',
    'top_statements',
    'headline',
    'headline_zh',
    'data2videoUrl',
    'status',
  ],
};

F.fields = {
  ...F.fields,
  ...{
    comments_full: {
      comments: [
        'id',
        'system',
        'user_id',
        'title',
        'text',
        'email',
        'type',
        'target_type',
        'target_id',
        'status',
        'like',
        'liker',
        'dislike',
        'disliker',
        'user_agent',
        'created_time',
        'updated_time',
        'is_deleted',
      ],
    },
    comments_in_list: {
      comments: [
        'user_id',
        'user_name',
        'title',
        'text',
        'target_id',
        'status',
        'like',
        'liker',
        'dislike',
        'disliker',
        'created_time',
        'updated_time',
      ],
    },
    comments: {
      comments: [
        'user_id',
        'title',
        'text',
        'email',
        'type',
        'target_type',
        'target_id',
        'status',
        'like',
        'dislike',
        'created_time',
        'updated_time',
      ],
    },
    org: {
      forTree: {
        organization: ['name', 'name_zh', 'logo', 'type', 'stats', 'parents', 'is_public'],
      },
      full: {
        organization: [
          'name',
          'name_zh',
          'logo',
          'desc',
          'type',
          'stats',
          'desc_zh',
          'created_time',
          'updated_time',
          'parents',
          'creator',
          'is_public',
        ],
      },
    },

    // ------- tobProfile -------------
    tobProfile: {
      forList: {
        tob_profile: [
          'aid',
          'sid',
          'name',
          'name_zh',
          'gender',
          'title',
          'level',
          'affiliation',
          'email',
          'phone',
        ],
        // tob_profile: ["name", "name_zh", "src", "sid", "gender", "title", "level", "affiliation", "bio", "email", "phone", "confidence", "aid", "educations", "experiences", "positions", "awards", "projects"],
      },
      full: {
        // pass no schema to get full.
      },
    },

    // ------------- awards ------------------
    awards_match_group: {
      forList: {
        award_match_group: ['id', 'name', 'project_id', 'type', 'updated_time', 'is_public'],
      },
      full: {
        award_match_group: [
          'id',
          'created_time',
          'updated_time',
          'is_public',
          'matches',
          'name',
          'project_id',
          'type',
        ],
      },
    },

    // ------------- topic ---------------
    topic: {
      full: ['def', 'def_zh', 'id', 'name', 'name_zh', 'alias'],
    },

    // domain/channel
    domain: {
      topAuthor: [
        'id',
        // "tags",
        // "tags_zh",
        'name',
        'name_zh',
        'avatar',
        'org',
        {
          profile: ['position', 'position_zh', 'affiliation', 'affiliation_zh', 'org'],
        },
        {
          indices: [
            'hindex',
            'gindex',
            'pubs',
            'citations',
            'newStar',
            'risingStar',
            'activity',
            'diversity',
            'sociability',
          ],
        },
      ],
    },
  },
};

const Action = {
  trend2: {
    ListTrendProjects: 'trend_project.ListTrendProjects',
  },
  panorama: {},
};

const createFieldsArray = (data, ignoreEmpty = true) => {
  const result = [];
  Object.keys(data).map((field) => {
    const value = data[field];
    // 字段如果基本来自于antd的form，那么没动过的值是undefined，清空了是空字符串。
    if (!ignoreEmpty || value || typeof value === 'boolean' || value === 0) {
      result.push({ field, value });
    }
    return null;
  });
  return result;
};

const H = { createFieldsArray };

export { apiBuilder, Action, F, H };
