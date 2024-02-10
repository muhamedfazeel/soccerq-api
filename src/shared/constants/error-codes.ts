export const ERROR_CODES = {
  DEFAULT: {
    statusCode: 1000,
    message: 'Internal error',
  },
  INTERNAL: {
    statusCode: 1001,
    message: 'Internal error',
  },
  INPUT: {
    statusCode: 1002,
    message: 'Invalid input format',
  },
  AUTH_ERROR: {
    statusCode: 1003,
    message: 'Authentication error',
  },
  NOT_FOUND: {
    statusCode: 1004,
    message: 'Resource not found',
  },
  FORBIDDEN: {
    statusCode: 1005,
    message: 'This request cannot be fulfilled',
  },
  REQUEST_BODY_LARGE: {
    statusCode: 1006,
    message: 'Request body too large',
  },
  INVALID_ACCESS_TOKEN: {
    statusCode: 1007,
    message: 'Invalid access token',
  },
  INVALID_REFRESH_TOKEN: {
    statusCode: 1008,
    message: 'Invalid refresh token',
  },
  NO_AUTH_TOKEN: {
    statusCode: 1009,
    message: 'No auth token',
  },
  MAX_LOGIN_LIMIT: {
    statusCode: 1010,
    message: 'Maximum login limit reached',
  },
  LOGIN_BLOCKED: {
    statusCode: 1011,
    message: 'Login blocked after consecutive failed login attempts',
  },
  INACTIVE_USER: {
    statusCode: 1012,
    message: 'User is inactive',
  },
  BLACKLISTED_USER: {
    statusCode: 1013,
    message: 'User is blacklisted',
  },
  EMAIL_PC_EXISTS: {
    statusCode: 1014,
    message: 'Email PC Already exists',
  },
  MESSAGE_BODY: {
    statusCode: 1015,
    message: 'Either messageText or imageUrl is required',
  },
  REQUEST_BODY_EMPTY: {
    statusCode: 1020,
    message: 'Request body is empty',
  },
  FOLLOW_UNFOLLOW: {
    statusCode: 1021,
    message: 'Follow/unfollow action not possible',
  },
  LIKE_UNLIKE: {
    statusCode: 1022,
    message: 'Like or unlike action not possible',
  },
  ORDER_BLOCKED: {
    statusCode: 1023,
    message: 'Order cannot be created',
  },
  BULK_DELETE: {
    statusCode: 1025,
    message: 'Unprocessed entity',
  },
  CUSTOMER_NOT_EXISTS: {
    statusCode: 1026,
    message: 'Customer account not exists',
  },
  INVALID_PAYMENT_METHOD_ID: {
    statusCode: 1027,
    message: 'Invalid payment method id',
  },
  PAYMENT_METHOD_BLOCKED: {
    statusCode: 1028,
    message: 'Unable to register payment method',
  },
  CARD_EXPIRED: {
    statusCode: 1029,
    message: 'Expired card',
  },
  ST_POINTS_EXPIRED: {
    statusCode: 1030,
    message: 'Expired dot st points',
  },
  BAD_WEBHOOK_UPDATE: {
    statusCode: 1031,
    message: 'Unable to sync webhook event data with the database',
  },
  INVALID_ORDER_PRICE: {
    statusCode: 1032,
    message: 'Invalid order price',
  },
  NOT_EXIST_USER: {
    statusCode: 1033,
    message: 'User does not exist',
  },
  PUBLISH_UNPUBLISH: {
    statusCode: 1034,
    message: 'Publish/unpublish action not possible',
  },
  POST_SOLD_OUT: {
    statusCode: 1035,
    message: 'Post sold out',
  },
  REVIEW_EXISTS: {
    statusCode: 1036,
    message: 'Review already added',
  },
  YAMATO_ERROR: {
    statusCode: 1037,
    errorMessage: 'エラーが発生しました。管理者へお問い合わせ下さい。',
  },
  YAMATO_REQUEST_FIELDS_NULL: {
    statusCode: 1038,
    errorMessage: 'プロフィール情報が更新されていません。',
  },
  INVALID_ORDER_ID: {
    statusCode: 1039,
    message: 'Invalid order id',
  },
  INVALID_POST: {
    statusCode: 1040,
    message: 'This post cannot be purchased.',
  },
  PRODUCT_MODIFIED: {
    statusCode: 1041,
    message: 'This product is currently being modified',
  },
  BAD_COMMENT_REQUEST: {
    statusCode: 1041,
    message: 'Unable to add comment',
  },
  POST_LIKE_ERROR: {
    statusCode: 1042,
    message: 'Deleted or unpublished post provided',
  },
  REVIEW_HIDE: {
    statusCode: 1043,
    message: 'Review hide/unhide status has already been updated',
  },
  REFUND_ERROR: {
    statusCode: 1045,
    message: 'Unable to add refund',
  },
  POINTS_API_ERROR: {
    statusCode: 1046,
    message: 'Dot St points API error occurred',
  },
  BAD_PAYMENT_METHOD_DELETE: {
    statusCode: 1052,
    message: 'Unable to delete payment method',
  },
  BAD_POST_STATUS_COMMENT: {
    statusCode: 1053,
    message: 'Unable to add comment to sold or draft posts',
  },
  UNPROCESSSABLE_ENTITY: {
    statusCode: 1054,
    message: 'This action could not be processed',
  },
  INVALID_POSTAL_PROVINCE_MAPPING: {
    statusCode: 1055,
    message: 'Invalid postal code/province mapping',
  },
  WEB_ONBOARDING_ERROR: {
    statusCode: 1057,
    message: 'User Onboarding already completed',
  },
  YAMATO_MAINTANENCE_ERROR: {
    statusCode: 1058,
    errorMessage: 'メンテナンス中です。しばらくたってから再度お試し下さい。',
  },
  INVALID_POST_ID: {
    statusCode: 1059,
    errorMessage: 'Invalid post',
  },
  FAILED_ORDER: {
    statusCode: 1060,
    errorMessage: '取引が失敗になり、再出品されました',
  },
  FAILED_ORDER_WEB: {
    statusCode: 1061,
    message:
      '代金が期限内に支払われなかったため無効な取引となりました。再度公開された商品はこちらです。',
  },
  ST_POINTS_UPDATE_ERROR: {
    statusCode: 1063,
    message: 'Unable to update dot st points',
  },
  TLB_API_ERROR: {
    statusCode: 1064,
    message: 'TLB API error occurred',
  },
};
