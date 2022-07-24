echo"Starting deploy"

echo"Download changes"
git pull origin dev

echo"Stop containers"
docker-compose down

echo"Delete images"
docker rmi postventa-service_prod

echo"Create new images"
docker-compose build

echo"Start containeres"
docker-compose up -d