exports.tweet = {
  created_at: 'Tue Jun 14 01:01:43 +0000 2016',
  id: 742522370645200900,
  id_str: '742522370645200896',
  text:
    'NEW | F16019090 | MEDICAL | Loc: 0 Block APPLEBLOSSOM DR HAM @ CHESTER AV/BRIGADOON DR /CN: HELEN ZURHBRIGG NON-PROFIT HOME | Units: 1 | 6/13/16 21:00',
  source: '<a href="http://tweetymail.com" rel="nofollow">tweetymail</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user: {
    id: 611701456,
    id_str: '611701456',
    name: 'HamOnt Fire Dept',
    screen_name: 'HFD_Incidents',
    location: 'Hamilton Ontario Canada',
    url: 'http://www.hamilton.ca/fire',
    description:
      'Hamilton Fire Department Incidents Notification || Protect and promote quality of life and public safety || This is an automated HFD Incident Feed',
    protected: false,
    verified: false,
    followers_count: 5542,
    friends_count: 0,
    listed_count: 126,
    favourites_count: 0,
    statuses_count: 123174,
    created_at: 'Mon Jun 18 13:51:31 +0000 2012',
    utc_offset: -14400,
    time_zone: 'Eastern Time (US & Canada)',
    geo_enabled: false,
    lang: 'en',
    contributors_enabled: false,
    is_translator: false,
    profile_background_color: '131516',
    profile_background_image_url:
      'http://abs.twimg.com/images/themes/theme14/bg.gif',
    profile_background_image_url_https:
      'https://abs.twimg.com/images/themes/theme14/bg.gif',
    profile_background_tile: true,
    profile_link_color: '009999',
    profile_sidebar_border_color: 'EEEEEE',
    profile_sidebar_fill_color: 'EFEFEF',
    profile_text_color: '333333',
    profile_use_background_image: true,
    profile_image_url:
      'http://pbs.twimg.com/profile_images/2319299615/uu0du7wv3hqh3fi1t4mr_normal.jpeg',
    profile_image_url_https:
      'https://pbs.twimg.com/profile_images/2319299615/uu0du7wv3hqh3fi1t4mr_normal.jpeg',
    default_profile: false,
    default_profile_image: false,
    following: null,
    follow_request_sent: null,
    notifications: null,
  },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  is_quote_status: false,
  retweet_count: 0,
  favorite_count: 0,
  entities: {
    hashtags: [],
    urls: [],
    user_mentions: [],
    symbols: [],
  },
  favorited: false,
  retweeted: false,
  filter_level: 'low',
  lang: 'en',
  timestamp_ms: '1465866103217',
};

exports.refined = {
  id: 742522370645200900,
  text:
    'NEW | F16019090 | MEDICAL | Loc: 0 Block APPLEBLOSSOM DR HAM @ CHESTER AV/BRIGADOON DR /CN: HELEN ZURHBRIGG NON-PROFIT HOME | Units: 1 | 6/13/16 21:00',
  time: 'Tue Jun 14 01:01:43 +0000 2016',
};

exports.parsed = {
  id: 742522370645200900,
  code: 'F16019090',
  time: new Date('Tue Jun 14 01:01:43 +0000 2016'),
  type: 'NEW',
  category: 'MEDICAL',
  originalLocation:
    'Loc: 0 Block APPLEBLOSSOM DR HAM @ CHESTER AV/BRIGADOON DR /CN: HELEN ZURHBRIGG NON-PROFIT HOME',
  city: 'Hamilton',
  streets: ['APPLEBLOSSOM DR', 'CHESTER AV', 'BRIGADOON DR'],
  locationName: 'HELEN ZURHBRIGG NON-PROFIT HOME',
  intersection: 'APPLEBLOSSOM DR at CHESTER AV, Hamilton',
};

exports.geoCoded = {
  id: 742522370645200900,
  time: '1465866103217',
  code: 'F16019090',
  type: 'NEW',
  category: 'MEDICAL',
  originalLocation:
    'Loc: 0 Block APPLEBLOSSOM DR HAM @ CHESTER AV/BRIGADOON DR /CN: HELEN ZURHBRIGG NON-PROFIT HOME',
  city: 'Hamilton',
  streets: ['APPLEBLOSSOM DR', 'CHESTER AV', 'BRIGADOON DR'],
  locationName: 'HELEN ZURHBRIGG NON-PROFIT HOME',
  intersection: 'APPLEBLOSSOM DR at CHESTER AV, Hamilton',
  coordinates: { lat: 43.216957, lng: -79.89728099999999 },
  formatted_address: 'Appleblossom Dr & Chester Ave, Hamilton, ON L9C, Canada',
};
