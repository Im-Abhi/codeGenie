FROM gcc:latest
COPY . /usr/src/cpp
WORKDIR /usr/src/cpp
RUN g++ main.cpp -o testFile ./testFile<inputf.in>outputf.out
# RUN g++ -o testFile main.cpp
CMD ["./testFile"]