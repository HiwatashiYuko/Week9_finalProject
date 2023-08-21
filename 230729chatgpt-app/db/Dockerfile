FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD rootpassword
ENV MYSQL_DATABASE teamb
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD password
COPY ./db/init.sql /docker-entrypoint-initdb.d/
COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d/
EXPOSE 3306
