FROM node:18-alpine AS static_build
WORKDIR /app
COPY /Client .
RUN npm install && \
    npm run build

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
ARG TARGETARCH
WORKDIR /source
COPY ./Server .
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish -a ${TARGETARCH/amd64/x64} --use-current-runtime --self-contained false -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS development
WORKDIR /app 
COPY --from=build /app .
USER $APP_UID
ENTRYPOINT ["dotnet", "Posts_Website.dll"]

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS production
WORKDIR /app 
COPY --from=build /app .
COPY --from=static_build /app/dist ./wwwroot
USER $APP_UID
ENTRYPOINT ["dotnet", "Posts_Website.dll"]
