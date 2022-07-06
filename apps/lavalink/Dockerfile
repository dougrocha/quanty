FROM azul/zulu-openjdk:13

EXPOSE 9000

# Run as non-root user
RUN groupadd -g 322 lavalink && \
    useradd -r -u 322 -g lavalink lavalink
USER lavalink

WORKDIR /opt/Lavalink

COPY Lavalink.jar Lavalink.jar
COPY application.yml application.yml

ENTRYPOINT ["java", "-Xmx4G", "-jar", "./Lavalink.jar"]
