FROM gcc:latest
COPY . /usr/src/cpp
WORKDIR /usr/src/cpp
# RUN g++ main.cpp -o testFile
# RUN ./testFile < inputf.txt > outputf.txt
RUN g++ -o testFile main.cpp
CMD ["./testFile"]