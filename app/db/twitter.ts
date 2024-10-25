import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

// Twitter API credentials (set via environment variables)
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;
const accessToken = process.env.TWITTER_ACCESS_TOKEN!;
const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET!;

const oauth = new OAuth({
  consumer: {
    key: consumerKey,
    secret: consumerSecret,
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) =>
    crypto.createHmac('sha1', key).update(baseString).digest('base64'),
});

const token = {
  key: accessToken,
  secret: accessSecret,
};

async function postTweet(content: string) {
  const url = 'https://api.twitter.com/2/tweets';
  const requestData = {
    url,
    method: 'POST',
    data: {
      text: content, // API v2 uses "text" instead of "status"
    },
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: url,
        method: 'POST',
      },
      token
    )
  );

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: authHeader['Authorization'],
        'user-agent': 'v2CreateTweetJS',
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(requestData.data),
    });

    const { data } = await response.json();
    if (response.ok) {
      console.log('Tweet posted successfully:', data);
    } else {
      console.error('Error posting tweet:', data);
    }
    return data;
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

async function deleteTweet(tweetId: string) {
  const url = `https://api.twitter.com/2/tweets/${tweetId}`;
  const requestData = {
    url,
    method: 'DELETE',
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: url,
        method: 'POST',
      },
      token
    )
  );

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader['Authorization'],
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Tweet deleted successfully:', data);
    } else {
      console.error('Error deleting tweet:', data);
    }
    return data;
  } catch (error) {
    console.error('Error deleting tweet:', error);
  }
}

export { postTweet, deleteTweet };
