ACCOUNT := clearmatics
SERVICE := observer-dapp
IMAGE := $(ACCOUNT)/$(SERVICE)

default: all

all: login build push logout

login:
	$(info Make: Login to Docker Hub)
	@echo $(DOCKER_PASS) | docker login -u $(DOCKER_USER) --password-stdin

build:
	$(info Make: Building latest tagged image)
	@docker build -t $(IMAGE):latest -f Dockerfile .

pull:
	$(info Make: Pulling latest image from DockerHub)
	@docker pull $(IMAGE):latest

run:
	$(info Make: Building latest tagged image)
	@docker run -d -p 3000:3000 --name $(SERVICE) $(IMAGE):latest

clean:
	$(info Make: Cleaning latest tagged image)
	@docker stop $(SERVICE)
	@docker rm $(SERVICE)

push:
	$(info Make: Pushing latest tagged image)
	@docker push $(IMAGE):latest

logout:
	$(info Make: Clear Docker Hub credentials)
	@docker logout
