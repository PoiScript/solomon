# install dependencies

yarn

# copy assets files

assets=( favicon.ico icon.png fonts )

for i in "${assets[@]}"
do
	cp public/$i ng/src/$1 -r
	cp public/$i react/public/$1 -r
done

# render markdown

yarn generate:post
yarn generate:rss

# copy json to AMP directory

cp public/post.json amp/post.json

# copy json & html to React directory

cp public/post.json react/src/post.json
cp -R public/html react/public/html

# copy json & html to Angular directory

cp public/post.json ng/src/post.json
cp -R public/html ng/src/html

# save git commit hash to .env files as environment variables

echo "REACT_APP_GIT_HASH=$(git rev-parse --short HEAD)" > react/.env
cd content
echo "REACT_APP_CONTENT_GIT_HASH=$(git rev-parse --short HEAD)" >> ../react/.env
